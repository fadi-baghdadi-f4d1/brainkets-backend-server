import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Company } from '@/interfaces/company.interface';
import { CompanyService } from '@/services/company.service';
import { UpdateCompanyDto } from '@/dtos/company.dto';
import { ResponseUtil } from '@/utils/responseUtil';

export class CompanyController {
  public company = Container.get(CompanyService);

  public getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = Number(req.params.id);
      const findOneCompanyData: Company = await this.company.findCompanyById(companyId);

      const response = await ResponseUtil.generateSuccessResponse(findOneCompanyData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  public updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId = Number(req.params.id);
      const companyData: UpdateCompanyDto = req.body;
      const updateCompanyData: Company = await this.company.updateCompany(companyId, companyData);
      const response = await ResponseUtil.generateSuccessResponse(updateCompanyData);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
