import { StatusEnum } from '@/utils/statusEnum';
import { BaseException } from './dto/BaseException';

interface ValidationError {
  property: string;
  constraints: { [type: string]: string };
}

export class ValidationException extends BaseException {
  constructor(public errors: ValidationError[]) {
    super(StatusEnum.BAD_REQUEST_EXCEPTION);
    this.name = 'ValidationException';
    this.message = 'Validation failed';
    this.data = this.formatErrors();
  }

  private formatErrors() {
    return this.errors.map(error => ({
      property: error.property,
      message: Object.values(error.constraints)[0], // Get the first error message
    }));
  }
}
