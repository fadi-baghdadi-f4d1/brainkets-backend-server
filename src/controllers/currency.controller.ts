import { CreateCurrencyDto, UpdateCurrencyDto } from '@/dtos/currency.dto';
import { UpdateCurrencyFormatDto } from '@/dtos/currencyFormat.dto';
import { Currency } from '@/interfaces/currency.interface';
import { CurrencyFormat } from '@/interfaces/currencyFormat.interface';
import { CurrencyService } from '@/services/currency.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class CurrencyController {
  public currency = Container.get(CurrencyService);

  public createCurrency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyData: CreateCurrencyDto = req.body;
      const createCurrencyData: Currency = await this.currency.createCurrency(currencyData);

      res.status(201).json({ data: createCurrencyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getCurrencyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyId = Number(req.params.id);
      const findOneCurrencyData: Currency = await this.currency.findCurrencyById(currencyId);

      res.status(200).json({ data: findOneCurrencyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getCurrencies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCurrenciesData: Currency[] = await this.currency.findAllCurrency();

      res.status(200).json({ data: findAllCurrenciesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public updateCurrency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyId = Number(req.params.id);
      const currencyData: UpdateCurrencyDto = req.body;
      const updateCurrencyData: Currency = await this.currency.updateCurrency(currencyId, currencyData);

      res.status(200).json({ data: updateCurrencyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCurrency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyId = Number(req.params.id);
      const deleteCurrencyData: Currency = await this.currency.deleteCurrency(currencyId);

      res.status(200).json({ data: deleteCurrencyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getCurrencyFormat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyFormatId = Number(req.params.id);
      const findCurrencyFormatData: CurrencyFormat = await this.currency.findCurrencyFormat(currencyFormatId);

      res.status(200).json({ data: findCurrencyFormatData, message: '' });
    } catch (error) {
      next(error);
    }
  };

  public updateCurrencyFormat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyFormatId = Number(req.params.id);
      const currencyFormatData: UpdateCurrencyFormatDto = req.body;
      const updateCurrencyFormatData: CurrencyFormat = await this.currency.updateCurrencyFormat(currencyFormatId, currencyFormatData);

      res.status(200).json({ data: updateCurrencyFormatData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
