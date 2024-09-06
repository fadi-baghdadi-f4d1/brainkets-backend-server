import { Service } from 'typedi';
import { DB } from '@database';
import { HttpException } from '@/exceptions/HttpException';
import { Company } from '@/interfaces/company.interface';
import { UpdateCompanyDto } from '@/dtos/company.dto';

@Service()
export class CompanyService {
  // public async findAllUser(): Promise<User[]> {
  //   const allUser: User[] = await DB.Users.findAll();
  //   return allUser;
  // }

  public async findCompanyById(companyId: number): Promise<Company> {
    const findCompany: Company = await DB.Companies.findByPk(companyId);
    if (!findCompany) throw new HttpException(409, "Company doesn't exist");

    return findCompany;
  }

  // public async createUser(userData: CreateUserDto): Promise<User> {
  //   const findUser: User = await DB.Users.findOne({ where: { email: userData.email } });
  //   if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

  //   const hashedPassword = await hash(userData.password, 10);
  //   const createUserData: User = await DB.Users.create({ ...userData, password: hashedPassword });
  //   return createUserData;
  // }

  public async updateCompany(companyId: number, companyData: UpdateCompanyDto): Promise<Company> {
    const findCompany: Company = await DB.Companies.findByPk(companyId);
    if (!findCompany) throw new HttpException(409, "Company doesn't exist");

    await DB.Companies.update({ ...companyData }, { where: { id: companyId } });

    const updateCompany: Company = await DB.Companies.findByPk(companyId);
    return updateCompany;
  }

  // public async deleteUser(userId: number): Promise<User> {
  //   const findUser: User = await DB.Users.findByPk(userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   await DB.Users.destroy({ where: { id: userId } });

  //   return findUser;
  // }
}
