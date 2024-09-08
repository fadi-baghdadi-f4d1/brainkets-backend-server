export class StatusEnum {
  static readonly SUCCESS = new StatusEnum('SUCCESS', 2_00_00_00, 'SUCCESS', 200);

  static readonly BAD_REQUEST_EXCEPTION = new StatusEnum('BAD_REQUEST_EXCEPTION', 4_00_00_00, 'BAD_REQUEST_EXCEPTION', 400);
  static readonly VALIDATION_ERROR = new StatusEnum('VALIDATION_ERROR', 4_00_00_01, 'VALIDATION_ERROR', 400);
  static readonly CURRENCY_ALREADY_EXIST_EXCEPTION = new StatusEnum(
    'CURRENCY_ALREADY_EXIST_EXCEPTION',
    4_00_00_02,
    'CURRENCY_ALREADY_EXIST_EXCEPTION',
    409,
  );

  static readonly NOT_FOUND_EXCEPTION = new StatusEnum('NOT_FOUND_EXCEPTION', 4_04_00_00, 'NOT_FOUND_EXCEPTION', 404);

  static readonly INTERNAL_SERVER_ERROR_EXCEPTION = new StatusEnum(
    'INTERNAL_SERVER_ERROR_EXCEPTION',
    5_00_00_00,
    'INTERNAL_SERVER_ERROR_EXCEPTION',
    500,
  );

  private constructor(
    public readonly key: string,
    public readonly code: number,
    public readonly message: string,
    public readonly httpStatus: number,
  ) {}

  toString() {
    return this.key;
  }
}
