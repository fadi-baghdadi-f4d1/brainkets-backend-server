import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Company } from '@/interfaces/company.interface';
import { CompanyService } from '@/services/company.service';
import { UpdateCompanyDto } from '@/dtos/company.dto';

export class CompanyController {
  public company = Container.get(CompanyService);

  public getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = Number(req.params.id);
      const findOneCompanyData: Company = await this.company.findCompanyById(companyId);

      res.status(200).json({ data: findOneCompanyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = Number(req.params.id);
      const companyData: UpdateCompanyDto = req.body;
      const updateCompanyData: Company = await this.company.updateCompany(companyId, companyData);

      res.status(200).json({ data: updateCompanyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
