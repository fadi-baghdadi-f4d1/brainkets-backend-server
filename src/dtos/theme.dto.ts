import { IsNotEmpty, IsOptional, IsHexColor } from 'class-validator';

export class UpdateThemeDto {
  @IsHexColor()
  @IsNotEmpty()
  @IsOptional()
  public primaryColor?: string;

  @IsHexColor()
  @IsNotEmpty()
  @IsOptional()
  public secondaryColor?: string;

  @IsHexColor()
  @IsNotEmpty()
  @IsOptional()
  public loginBgColor?: string;

  // These fields will be handled separately via file upload
  // They are optional in the DTO because they'll be populated from the files object
  @IsOptional()
  public favicon?: string;

  @IsOptional()
  public logoLightTheme?: string;

  @IsOptional()
  public logoDarkTheme?: string;

  @IsOptional()
  public backgroundImage?: string;
}
