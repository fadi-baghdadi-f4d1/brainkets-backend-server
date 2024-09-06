import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  public email?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public phoneNumber?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public website?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public address?: string;
}
