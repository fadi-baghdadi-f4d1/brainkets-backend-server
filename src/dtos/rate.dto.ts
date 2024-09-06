import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRateDto {
  @IsNumber()
  @IsNotEmpty()
  public currencyId: number;
  @IsNumber()
  @IsNotEmpty()
  public exchangeRate: number;
}
