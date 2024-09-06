import { App } from '@/app';
// import { AuthRoute } from '@routes/auth.route';
// import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CompanyRoute } from './routes/company.route';
import { ThemeRoute } from './routes/theme.route';
import { CurrencyRoute } from './routes/currency.route';
import { RateRoute } from './routes/rate.route';

ValidateEnv();

// const app = new App([new AuthRoute(), new UserRoute()]);
const app = new App([new CompanyRoute(), new ThemeRoute(), new CurrencyRoute(), new RateRoute()]);

app.listen();
