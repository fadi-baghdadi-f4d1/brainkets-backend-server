import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { i18next } from '../config/i18n';
import { StatusEnum } from '@/utils/statusEnum';
import { ApiResponse } from '@/shared/ApiResponse';
import { BaseException } from '@/exceptions/dto/BaseException';
import { ValidationException } from '@/exceptions/ValidationException';

export const ErrorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    let status: StatusEnum;
    let message: string;
    let data: any;

    if (error instanceof BaseException) {
      status = error.statusEnum;
      message = i18next.t(status.key);
      data = error.data;

      if (error instanceof ValidationException) {
        message = i18next.t(StatusEnum.VALIDATION_ERROR.message);
        data = error.data.map(err => ({
          property: err.property,
          message: err.message,
        }));
      }
    } else {
      status = StatusEnum.INTERNAL_SERVER_ERROR_EXCEPTION;
      message = i18next.t(status.key);
    }

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status.httpStatus}, Message:: ${message}`);
    res.status(status.httpStatus).json(ApiResponse.error(status, message, data));
  } catch (err) {
    next(err);
  }
};
