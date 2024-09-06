import { Rate } from '@/interfaces/rate.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type RateCreationAttributes = Optional<Rate, 'id' | 'currencyId' | 'exchangeRate'>;

export class RateModel extends Model<Rate, RateCreationAttributes> implements Rate {
  public id: number;
  public currencyId: number;
  public exchangeRate: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof RateModel {
  RateModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      currencyId: {
        allowNull: false,
        type: DataTypes.INTEGER(), // Use INTEGER instead of REAL since it's a foreign key
        references: {
          model: 'currencies', // Name of the table you are referencing
          key: 'id', // The primary key in CurrencyModel
        },
        onDelete: 'CASCADE', // handle deletion behavior
        field: 'currency_id',
      },
      exchangeRate: {
        allowNull: false,
        type: DataTypes.REAL(),
        field: 'exchange_rate',
      },
    },
    {
      tableName: 'rates',
      sequelize,
    },
  );

  return RateModel;
}
