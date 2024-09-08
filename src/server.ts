import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { CompanyRoute } from './routes/company.route';
import { ThemeRoute } from './routes/theme.route';
import { CurrencyRoute } from './routes/currency.route';
import { RateRoute } from './routes/rate.route';
import { logger } from '@utils/logger';
import { SmtpRoute } from './routes/smtp.route';

ValidateEnv();

// const app = new App([new AuthRoute(), new UserRoute()]);
const app = new App([new CompanyRoute(), new ThemeRoute(), new CurrencyRoute(), new RateRoute(), new SmtpRoute()]);

process.on('uncaughtException', (error: Error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error(`Unhandled Rejection: ${reason.message}`);
  process.exit(1);
});

app.listen();
