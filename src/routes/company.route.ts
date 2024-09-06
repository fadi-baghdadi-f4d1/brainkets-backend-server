import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CompanyController } from '@/controllers/company.controller';
import { UpdateCompanyDto } from '@/dtos/company.dto';

export class CompanyRoute implements Routes {
  public path = '/companies';
  public router = Router();
  public company = new CompanyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, this.company.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.company.getCompanyById);
    // this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.company.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateCompanyDto, true), this.company.updateCompany);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.company.deleteUser);
  }
}
