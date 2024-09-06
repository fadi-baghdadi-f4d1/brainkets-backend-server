import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { RateController } from '@/controllers/rate.controller';
import { CreateRateDto } from '@/dtos/rate.dto';

export class RateRoute implements Routes {
  public path = '/rates';
  public router = Router();
  public rate = new RateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.rate.getRates);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRateDto), this.rate.createRate);
  }
}
