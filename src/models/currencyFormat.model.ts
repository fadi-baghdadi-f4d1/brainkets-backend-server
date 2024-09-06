import { CurrencyFormat } from '@/interfaces/currencyFormat.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type CurrencyFormatCreationAttributes = Optional<CurrencyFormat, 'id' | 'symbolPosition' | 'decimalPlaces'>;

export class CurrencyFormatModel extends Model<CurrencyFormat, CurrencyFormatCreationAttributes> implements CurrencyFormat {
  public id: number;
  public symbolPosition: string;
  public decimalPlaces: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CurrencyFormatModel {
  CurrencyFormatModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      symbolPosition: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(),
      },
      decimalPlaces: {
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER(),
      },
    },
    {
      tableName: 'currency_formats',
      sequelize,
    },
  );

  return CurrencyFormatModel;
}
