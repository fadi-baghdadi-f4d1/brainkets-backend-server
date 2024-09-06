import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsString()
  @IsNotEmpty()
  public symbol: string;
  @IsString()
  @IsNotEmpty()
  public code: string;
  @IsBoolean()
  @IsNotEmpty()
  public isDefault: boolean;
}

export class UpdateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public symbol?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public code?: string;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  public isDefault?: boolean;
}
