import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { DB } from '@database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import path from 'path';
import { ResponseMiddleware } from './middlewares/response.middleware';
import middleware from 'i18next-http-middleware';
import { ValidationException } from './exceptions/ValidationException';
import { ResponseUtil } from './utils/responseUtil';
import { StatusEnum } from './utils/statusEnum';
import i18next from 'i18next';
import { initI18next } from './config/i18n';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    // Assuming your 'uploads' folder is in the root of your project
    const uploadsPath = path.join(__dirname, '../uploads');

    // Serve static files from the 'uploads' directory
    this.app.use('/uploads', express.static(uploadsPath));

    this.initializeI18next();
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await DB.sequelize.sync({ force: false });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(middleware.handle(i18next));
    this.app.use(ResponseMiddleware);
  }

  private async initializeI18next() {
    await initI18next();
    this.app.use(middleware.handle(i18next));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      if (route.router && typeof route.router.use === 'function') {
        this.app.use('/', (req, res, next) => {
          Promise.resolve(route.router(req, res, next)).catch(error => {
            if (error instanceof ValidationException) {
              next(error);
            } else {
              ResponseUtil.generateErrorResponse(StatusEnum.INTERNAL_SERVER_ERROR_EXCEPTION)
                .then(response => {
                  res.status(response.statusCode).json(response);
                })
                .catch(next);
            }
          });
        });
      } else {
        console.error(`Invalid router for route: ${route.constructor.name}`);
      }
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
