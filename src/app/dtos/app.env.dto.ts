import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import {
  ENUM_USER_SRV_APP_ENVIRONMENT,
  ENUM_USER_SRV_APP_TIMEZONE,
} from 'src/app/enums/app.enum';

export class AppEnvDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  USER_SRV_APP_NAME: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @IsEnum(ENUM_USER_SRV_APP_ENVIRONMENT)
  USER_SRV_APP_ENV: ENUM_USER_SRV_APP_ENVIRONMENT;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ENUM_USER_SRV_APP_TIMEZONE)
  USER_SRV_APP_TIMEZONE: ENUM_USER_SRV_APP_TIMEZONE;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  USER_SRV_GRPC_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  USER_SRV_GRPC_PORT: number;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  USER_SRV_URL_VERSIONING_ENABLE: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  USER_SRV_URL_VERSION: number;
}
