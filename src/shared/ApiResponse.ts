import { StatusEnum } from '@/utils/statusEnum';

export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;

  constructor(status: StatusEnum, data?: T) {
    // this.success = status.httpStatus < 400;
    this.message = status.message;
    this.statusCode = status.httpStatus;
    if (data) this.data = data;
  }

  static success<T>(data?: T, message?: string): ApiResponse<T> {
    const response = new ApiResponse<T>(StatusEnum.SUCCESS, data);
    if (message) response.message = message;
    return response;
  }

  static error<T>(status: StatusEnum, message?: string, data?: T): ApiResponse<T> {
    const response = new ApiResponse<T>(status, data);
    if (message) response.message = message;
    return response;
  }
}
