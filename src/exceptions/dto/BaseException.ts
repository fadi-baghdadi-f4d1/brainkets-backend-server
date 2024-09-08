import { StatusEnum } from '@/utils/statusEnum';

export class BaseException extends Error {
  public statusEnum: StatusEnum;
  public data?: any;

  constructor(statusEnum: StatusEnum, data?: any) {
    super(statusEnum.message);
    this.name = this.constructor.name;
    this.statusEnum = statusEnum;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}
