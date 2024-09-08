import { StatusEnum } from '@/utils/statusEnum';
import { BaseException } from './dto/BaseException';

export class CurrencyAlreadyExistException extends BaseException {
  constructor() {
    super(StatusEnum.CURRENCY_ALREADY_EXIST_EXCEPTION);
  }
}
