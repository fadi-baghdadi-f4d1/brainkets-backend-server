import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import { logger } from '@utils/logger';
import CompanyModel from '@/models/company.model';
import ThemeModel from '@/models/theme.model';
import CurrencyModel from '@/models/currency.model';
import CurrencyFormatModel from '@/models/currencyFormat.model';
import RateModel from '@/models/rate.model';
import SmtpModel from '@/models/smtp.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

const Companies = CompanyModel(sequelize);
const Themes = ThemeModel(sequelize);
const Currencies = CurrencyModel(sequelize);
const CurrencyFormats = CurrencyFormatModel(sequelize);
const Smtps = SmtpModel(sequelize);
const Rates = RateModel(sequelize);

// Set up associations
Currencies.hasMany(Rates, { foreignKey: 'currencyId', as: 'rates' });
Rates.belongsTo(Currencies, { foreignKey: 'currencyId', as: 'currency' });

export const DB = {
  Companies,
  Themes,
  Currencies,
  CurrencyFormats,
  Smtps,
  Rates,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
