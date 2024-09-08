import { StatusEnum } from './statusEnum';
import { ApiResponse } from '../shared/ApiResponse';
import { i18next } from '../config/i18n';

export class ResponseUtil {
  static async generateSuccessResponse<T>(data?: T, messageKey?: string): Promise<ApiResponse<T>> {
    const message = messageKey ? i18next.t(messageKey) : i18next.t(StatusEnum.SUCCESS.key);
    return ApiResponse.success(data, message);
  }

  static async generateErrorResponse(status: StatusEnum, messageKey?: string): Promise<ApiResponse> {
    const message = messageKey ? i18next.t(messageKey) : i18next.t(status.key);
    return ApiResponse.error(status, message);
  }
}
