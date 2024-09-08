import { Service } from 'typedi';
import { DB } from '@database';
import { Company } from '@/interfaces/company.interface';
import { UpdateCompanyDto } from '@/dtos/company.dto';
import { NotFoundException } from '@/exceptions/NotFoundException';

@Service()
export class CompanyService {
  public async findCompanyById(companyId: number): Promise<Company> {
    const findCompany: Company = await DB.Companies.findByPk(companyId);
    if (!findCompany) throw new NotFoundException();

    return findCompany;
  }

  public async updateCompany(companyId: number, companyData: UpdateCompanyDto): Promise<Company> {
    const findCompany: Company = await DB.Companies.findByPk(companyId);
    if (!findCompany) throw new NotFoundException();

    await DB.Companies.update({ ...companyData }, { where: { id: companyId } });
    const updateCompany: Company = await DB.Companies.findByPk(companyId);
    return updateCompany;
  }
}
