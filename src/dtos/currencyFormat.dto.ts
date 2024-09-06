import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateCurrencyFormatDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public symbolPosition?: string;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public decimalPlaces?: number;
}
