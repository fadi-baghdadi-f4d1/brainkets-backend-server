import { Service } from 'typedi';
import { DB } from '@database';
import { Rate } from '@/interfaces/rate.interface';
import { Op } from 'sequelize';
import { CreateRateDto } from '@/dtos/rate.dto';
import { NotFoundException } from '@/exceptions/NotFoundException';

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
      if (!defaultCurrency) throw new NotFoundException();

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
    if (!defaultRate) throw new NotFoundException();

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
}
