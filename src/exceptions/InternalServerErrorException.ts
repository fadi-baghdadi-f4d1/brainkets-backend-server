import { StatusEnum } from '@/utils/statusEnum';
import { BaseException } from './dto/BaseException';

export class InternalServerErrorException extends BaseException {
  constructor() {
    super(StatusEnum.INTERNAL_SERVER_ERROR_EXCEPTION);
  }
}
