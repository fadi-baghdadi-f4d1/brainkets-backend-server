import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CurrencyController } from '@/controllers/currency.controller';
import { CreateCurrencyDto, UpdateCurrencyDto } from '@/dtos/currency.dto';
import { UpdateCurrencyFormatDto } from '@/dtos/currencyFormat.dto';

export class CurrencyRoute implements Routes {
  public path = '/currencies';
  public router = Router();
  public currency = new CurrencyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/currency-format/:id(\\d+)`, this.currency.getCurrencyFormat);
    this.router.put(
      `${this.path}/currency-format/:id(\\d+)`,
      ValidationMiddleware(UpdateCurrencyFormatDto, true),
      this.currency.updateCurrencyFormat,
    );
    this.router.get(`${this.path}`, this.currency.getCurrencies);
    this.router.get(`${this.path}/:id(\\d+)`, this.currency.getCurrencyById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateCurrencyDto), this.currency.createCurrency);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateCurrencyDto, true), this.currency.updateCurrency);
    this.router.delete(`${this.path}/:id(\\d+)`, this.currency.deleteCurrency);
  }
}
