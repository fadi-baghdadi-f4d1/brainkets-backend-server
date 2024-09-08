import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { SendTestEmailDto, UpdateSmtpDto } from '@/dtos/smtp.dto';
import { SmtpController } from '@/controllers/smtp.controller';

export class SmtpRoute implements Routes {
  public path = '/smtps';
  public router = Router();
  public smtp = new SmtpController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.smtp.getSmtpById);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateSmtpDto), this.smtp.updateSmtp);
    this.router.post(`${this.path}/send-email`, ValidationMiddleware(SendTestEmailDto), this.smtp.sendTestEmail);
  }
}
