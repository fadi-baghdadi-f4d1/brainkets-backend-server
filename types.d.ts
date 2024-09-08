// types.d.ts
import { Response } from 'express';

declare global {
  namespace Express {
    interface Response {
      success(data?: any, message?: string): void;
    }
  }
}
