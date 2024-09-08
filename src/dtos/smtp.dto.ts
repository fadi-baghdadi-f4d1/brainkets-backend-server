import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSmtpDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public mailDriver?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public mailHost?: string;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public mailPort?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public mailUsername?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public mailPassword?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public mailFromName?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public mailFromEmail?: string;
  @IsString()
  @IsIn(['Tls', 'Ssl', 'None']) // Restrict to specific encryption types
  @IsOptional()
  public mailEncryption?: string;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  public isVerified?: boolean;
  @IsString()
  @IsIn(['Sync', 'Async', 'None']) // Restrict to specific connection types
  @IsOptional()
  public mailConnection?: string;
}

export class SendTestEmailDto {
  @IsString()
  @IsNotEmpty()
  public mailDriver: string;
  @IsString()
  @IsNotEmpty()
  public mailHost: string;
  @IsNumber()
  @IsNotEmpty()
  public mailPort: number;
  @IsString()
  @IsNotEmpty()
  public mailUsername: string;
  @IsString()
  @IsNotEmpty()
  public mailPassword: string;
  @IsString()
  @IsNotEmpty()
  public mailFromName: string;
  @IsString()
  @IsNotEmpty()
  public mailFromEmail: string;
  @IsString()
  @IsIn(['Tls', 'Ssl', 'None']) // Restrict to specific encryption types
  public mailEncryption: string;
  @IsBoolean()
  @IsNotEmpty()
  public isVerified: boolean;
  @IsString()
  @IsIn(['Sync', 'Async', 'None']) // Restrict to specific connection types
  public mailConnection: string;
}
