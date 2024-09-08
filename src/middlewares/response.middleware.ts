import { ApiResponse } from '@/shared/ApiResponse';
import { Request, Response, NextFunction } from 'express';
import i18next from 'i18next';

export const ResponseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.success = function (data?: any, message?: string) {
    const translatedMessage = message ? i18next.t(message, { lng: req.language }) : undefined;
    return this.json(ApiResponse.success(data, translatedMessage));
  };

  next();
};
