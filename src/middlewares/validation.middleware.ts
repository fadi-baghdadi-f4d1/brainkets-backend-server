import { ValidationException } from '@/exceptions/ValidationException';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const ValidationMiddleware = (type: any, skipMissingProperties = false, whitelist = false, forbidNonWhitelisted = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);
    try {
      await validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted });
      req.body = dto;
      next();
    } catch (errors) {
      const validationErrors = errors.map((error: ValidationError) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      next(new ValidationException(validationErrors));
    }
  };
};
