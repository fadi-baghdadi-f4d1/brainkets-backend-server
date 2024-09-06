import { Service } from 'typedi';
import { DB } from '@database';
import { HttpException } from '@/exceptions/HttpException';
import { Rate } from '@/interfaces/rate.interface';
import { Op } from 'sequelize';
import { CreateRateDto } from '@/dtos/rate.dto';

@Service()
export class RateService {
  public async findAllRates(defaultCurrencyId?: string): Promise<Rate[]> {
    const latestRates: Rate[] = await DB.Rates.findAll({
      where: {
        id: {
          [Op.in]: DB.sequelize.literal(`(
            SELECT MAX(id)
            FROM rates
            GROUP BY currency_id
          )`),
        },
      },
      order: [['updated_at', 'DESC']],
    });

    if (defaultCurrencyId) {
      const defaultCurrency = await DB.Currencies.findByPk(defaultCurrencyId);
      if (!defaultCurrency) throw new HttpException(409, "Currency doesn't exist");

      // Recalculate rates based on the provided default currency
      return this.calculateRatesBasedOnDefaultCurrency(latestRates, defaultCurrencyId);
    }

    // If no defaultCurrencyId is provided, return the rates as is
    return latestRates;
  }

  public async createRate(rateData: CreateRateDto): Promise<Rate> {
    const createRateData: Rate = await DB.Rates.create(rateData);
    return createRateData;
  }

  private calculateRatesBasedOnDefaultCurrency(allRates: Rate[], defaultCurrencyId: string): Rate[] {
    // Find the rate for the default currency
    const defaultRate = allRates.find(rate => rate.currencyId === parseInt(defaultCurrencyId));
    if (!defaultRate) throw new HttpException(409, "Exchange rate for default currency doesn't exist");

    // Perform the conversion for each currency based on the default currency's rate
    return allRates.map(rate => {
      if (rate.currencyId === parseInt(defaultCurrencyId)) {
        rate.exchangeRate = 1; // The default currency is always 1:1 with itself
      } else {
        rate.exchangeRate = rate.exchangeRate / defaultRate.exchangeRate; // Convert based on the default currency
      }
      return rate;
    });
  }

  // public async findCurrencyById(currencyId: number): Promise<Currency> {
  //   const currency = await this.checkIfCurrencyExist(currencyId);
  //   return currency;
  // }

  // public async createCurrency(currencyData: CreateCurrencyDto): Promise<Currency> {
  //   // Check if a currency with the same name, symbol, or code already exists
  //   const findCurrency: Currency = await DB.Currencies.findOne({
  //     where: {
  //       [Op.or]: [{ name: currencyData.name }, { symbol: currencyData.symbol }, { code: currencyData.code }],
  //     },
  //   });

  //   // If currency with similar name, symbol, or code exists, throw an error
  //   if (findCurrency) {
  //     throw new HttpException(409, `Currency with the same name, symbol, or code already exists`);
  //   }

  //   // If isDefault is set to true, update the existing default currency
  //   if (currencyData.isDefault) {
  //     await this.updateDefaultCurrency();
  //   }

  //   // Create the new currency
  //   const createCurrencyData: Currency = await DB.Currencies.create(currencyData);
  //   return createCurrencyData;
  // }

  // public async updateCurrency(currencyId: number, currencyData: UpdateCurrencyDto): Promise<Currency> {
  //   await this.checkIfCurrencyExist(currencyId);

  //   // Build dynamic where condition
  //   const whereConditions: any[] = [];
  //   if (currencyData.name) {
  //     whereConditions.push({ name: currencyData.name });
  //   }
  //   if (currencyData.symbol) {
  //     whereConditions.push({ symbol: currencyData.symbol });
  //   }
  //   if (currencyData.code) {
  //     whereConditions.push({ code: currencyData.code });
  //   }

  //   if (whereConditions.length > 0) {
  //     const findCurrency: Currency = await DB.Currencies.findOne({
  //       where: {
  //         [Op.or]: whereConditions,
  //         [Op.and]: { id: { [Op.ne]: currencyId } }, // Ensure it's not the current currency
  //       },
  //     });

  //     // If a currency with similar name, symbol, or code exists, throw an error
  //     if (findCurrency) {
  //       throw new HttpException(409, `Currency with the same name, symbol, or code already exists`);
  //     }
  //   }

  //   // If isDefault is set to true, update the existing default currency
  //   if (currencyData.isDefault !== undefined && currencyData.isDefault) {
  //     await this.updateDefaultCurrency();
  //   }

  //   // Update the currency
  //   await DB.Currencies.update({ ...currencyData }, { where: { id: currencyId } });

  //   const updateCurrency: Currency = await DB.Currencies.findByPk(currencyId);
  //   return updateCurrency;
  // }
  // public async findCurrencyFormat(currencyFormatId: number): Promise<CurrencyFormat> {
  //   const currencyFormat = await DB.CurrencyFormats.findByPk(currencyFormatId);
  //   if (!currencyFormat) throw new HttpException(409, "Currency doesn't exist");
  //   return currencyFormat;
  // }
}
