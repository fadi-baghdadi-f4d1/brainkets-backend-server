import { CreateRateDto } from '@/dtos/rate.dto';
import { Rate } from '@/interfaces/rate.interface';
import { RateService } from '@/services/rate.service';
import { ResponseUtil } from '@/utils/responseUtil';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class RateController {
  public rate = Container.get(RateService);

  public getRates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const defaultCurrencyId: string | null = <string>req.query.defaultCurrencyId || null;
      const findAllRatesData: Rate[] = await this.rate.findAllRates(defaultCurrencyId);

      const response = await ResponseUtil.generateSuccessResponse(findAllRatesData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public createRate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rateData: CreateRateDto = req.body;

      const createRateData: Rate = await this.rate.createRate(rateData);

      const response = await ResponseUtil.generateSuccessResponse(createRateData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
