import { StatusEnum } from '@/utils/statusEnum';
import { BaseException } from './dto/BaseException';

export class NotFoundException extends BaseException {
  constructor(message?: string) {
    super(StatusEnum.NOT_FOUND_EXCEPTION, message);
  }
}
