import { Company } from '@/interfaces/company.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type CompanyCreationAttributes = Optional<Company, 'id' | 'name' | 'email' | 'phoneNumber' | 'address' | 'website'>;

export class CompanyModel extends Model<Company, CompanyCreationAttributes> implements Company {
  public id: number;
  public name: string;
  public email: string;
  public phoneNumber: string;
  public website: string;
  public address: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CompanyModel {
  CompanyModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING(45),
        field: 'phone_number',
      },
      website: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'companies',
      sequelize,
    },
  );

  return CompanyModel;
}
