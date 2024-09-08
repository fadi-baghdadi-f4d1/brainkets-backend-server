import { CreateCurrencyDto, UpdateCurrencyDto } from '@/dtos/currency.dto';
import { UpdateCurrencyFormatDto } from '@/dtos/currencyFormat.dto';
import { Currency } from '@/interfaces/currency.interface';
import { CurrencyFormat } from '@/interfaces/currencyFormat.interface';
import { CurrencyService } from '@/services/currency.service';
import { ResponseUtil } from '@/utils/responseUtil';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class CurrencyController {
  public currency = Container.get(CurrencyService);

  public createCurrency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyData: CreateCurrencyDto = req.body;
      const createCurrencyData: Currency = await this.currency.createCurrency(currencyData);

      const response = await ResponseUtil.generateSuccessResponse(createCurrencyData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getCurrencyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyId = Number(req.params.id);
      const findOneCurrencyData: Currency = await this.currency.findCurrencyById(currencyId);

      const response = await ResponseUtil.generateSuccessResponse(findOneCurrencyData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getCurrencies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCurrenciesData: Currency[] = await this.currency.findAllCurrency();

      const response = await ResponseUtil.generateSuccessResponse(findAllCurrenciesData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public updateCurrency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyId = Number(req.params.id);
      const currencyData: UpdateCurrencyDto = req.body;
      const updateCurrencyData: Currency = await this.currency.updateCurrency(currencyId, currencyData);

      const response = await ResponseUtil.generateSuccessResponse(updateCurrencyData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public deleteCurrency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyId = Number(req.params.id);
      const deleteCurrencyData: Currency = await this.currency.deleteCurrency(currencyId);

      const response = await ResponseUtil.generateSuccessResponse(deleteCurrencyData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getCurrencyFormat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyFormatId = Number(req.params.id);
      const findCurrencyFormatData: CurrencyFormat = await this.currency.findCurrencyFormat(currencyFormatId);

      const response = await ResponseUtil.generateSuccessResponse(findCurrencyFormatData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public updateCurrencyFormat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyFormatId = Number(req.params.id);
      const currencyFormatData: UpdateCurrencyFormatDto = req.body;
      const updateCurrencyFormatData: CurrencyFormat = await this.currency.updateCurrencyFormat(currencyFormatId, currencyFormatData);

      const response = await ResponseUtil.generateSuccessResponse(updateCurrencyFormatData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
