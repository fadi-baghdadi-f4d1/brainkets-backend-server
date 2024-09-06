import { Currency } from '@/interfaces/currency.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type CurrencyCreationAttributes = Optional<Currency, 'id' | 'name' | 'symbol' | 'code' | 'isDefault'>;

export class CurrencyModel extends Model<Currency, CurrencyCreationAttributes> implements Currency {
  public id: number;
  public name: string;
  public symbol: string;
  public code: string;
  public isDefault: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CurrencyModel {
  CurrencyModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(),
      },
      symbol: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(5),
      },
      code: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(45),
      },
      isDefault: {
        allowNull: false,
        type: DataTypes.BOOLEAN(),
        defaultValue: false,
      },
    },
    {
      tableName: 'currencies',
      sequelize,
    },
  );

  return CurrencyModel;
}
