import { StatusEnum } from '@/utils/statusEnum';
import { BaseException } from './dto/BaseException';

export class BadRequestException extends BaseException {
  constructor() {
    super(StatusEnum.BAD_REQUEST_EXCEPTION);
  }
}
