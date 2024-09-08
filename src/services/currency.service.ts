import { Service } from 'typedi';
import { DB } from '@database';
import { Currency } from '@/interfaces/currency.interface';
import { CreateCurrencyDto, UpdateCurrencyDto } from '@/dtos/currency.dto';
import { Op } from 'sequelize';
import { CurrencyFormat } from '@/interfaces/currencyFormat.interface';
import { UpdateCurrencyFormatDto } from '@/dtos/currencyFormat.dto';
import { CurrencyAlreadyExistException } from '@/exceptions/CurrencyAlreadyExistException';
import { NotFoundException } from '@/exceptions/NotFoundException';

@Service()
export class CurrencyService {
  public async findAllCurrency(): Promise<Currency[]> {
    const allCurrency: Currency[] = await DB.Currencies.findAll();
    return allCurrency;
  }

  public async findCurrencyById(currencyId: number): Promise<Currency> {
    const currency = await this.checkIfCurrencyExist(currencyId);
    return currency;
  }

  public async createCurrency(currencyData: CreateCurrencyDto): Promise<Currency> {
    // Check if a currency with the same name, symbol, or code already exists
    const findCurrency: Currency = await DB.Currencies.findOne({
      where: {
        [Op.or]: [{ name: currencyData.name }, { symbol: currencyData.symbol }, { code: currencyData.code }],
      },
    });

    // If currency with similar name, symbol, or code exists, throw an error
    if (findCurrency) {
      throw new CurrencyAlreadyExistException();
    }

    // If isDefault is set to true, update the existing default currency
    if (currencyData.isDefault) {
      await this.updateDefaultCurrency();
    }

    // Create the new currency
    const createCurrencyData: Currency = await DB.Currencies.create(currencyData);
    return createCurrencyData;
  }

  public async updateCurrency(currencyId: number, currencyData: UpdateCurrencyDto): Promise<Currency> {
    await this.checkIfCurrencyExist(currencyId);

    // Build dynamic where condition
    const whereConditions: any[] = [];
    if (currencyData.name) {
      whereConditions.push({ name: currencyData.name });
    }
    if (currencyData.symbol) {
      whereConditions.push({ symbol: currencyData.symbol });
    }
    if (currencyData.code) {
      whereConditions.push({ code: currencyData.code });
    }

    if (whereConditions.length > 0) {
      const findCurrency: Currency = await DB.Currencies.findOne({
        where: {
          [Op.or]: whereConditions,
          [Op.and]: { id: { [Op.ne]: currencyId } }, // Ensure it's not the current currency
        },
      });

      // If a currency with similar name, symbol, or code exists, throw an error
      if (findCurrency) {
        throw new CurrencyAlreadyExistException();
      }
    }

    // If isDefault is set to true, update the existing default currency
    if (currencyData.isDefault !== undefined && currencyData.isDefault) {
      await this.updateDefaultCurrency();
    }

    // Update the currency
    await DB.Currencies.update({ ...currencyData }, { where: { id: currencyId } });

    const updateCurrency: Currency = await DB.Currencies.findByPk(currencyId);
    return updateCurrency;
  }

  public async deleteCurrency(currencyId: number): Promise<Currency> {
    const currency = await this.checkIfCurrencyExist(currencyId);
    await DB.Currencies.destroy({ where: { id: currencyId } });
    return currency;
  }

  public async findCurrencyFormat(currencyFormatId: number): Promise<CurrencyFormat> {
    const currencyFormat = await DB.CurrencyFormats.findByPk(currencyFormatId);
    if (!currencyFormat) throw new NotFoundException("Currency Format doesn't exist");
    return currencyFormat;
  }

  public async updateCurrencyFormat(currencyFormatId: number, currencyFormatData: UpdateCurrencyFormatDto): Promise<CurrencyFormat> {
    const currencyFormat = await DB.CurrencyFormats.findByPk(currencyFormatId);
    if (!currencyFormat) throw new NotFoundException("Currency Format doesn't exist");

    // Update the currency
    await DB.CurrencyFormats.update({ ...currencyFormatData }, { where: { id: currencyFormatId } });

    const updateCurrencyFormat: CurrencyFormat = await DB.CurrencyFormats.findByPk(currencyFormatId);
    return updateCurrencyFormat;
  }

  // Private method to check if a currency exists and return it or throw an error
  private async checkIfCurrencyExist(currencyId: number): Promise<Currency> {
    const currency: Currency = await DB.Currencies.findByPk(currencyId);
    if (!currency) throw new NotFoundException("Currency doesn't exist");
    return currency;
  }

  // Private method to update the default currency
  private async updateDefaultCurrency(): Promise<void> {
    const defaultCurrency = await DB.Currencies.findOne({
      where: { isDefault: true },
    });

    if (defaultCurrency) {
      await defaultCurrency.update({ isDefault: false });
    }
  }
}
