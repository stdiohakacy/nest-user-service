import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENUM_APP_ENVIRONMENT } from 'src/app/enums/app.enum';
import { TypeOrmOptionInterface } from './interfaces/typeorm.option.interface';
import { join } from 'path';

@Injectable()
export class TypeOrmOptionService implements TypeOrmOptionInterface {
  constructor(private readonly configService: ConfigService) {}

  createOptions(): TypeOrmModuleOptions {
    const env = this.configService.get<string>('app.env');

    const isProd = env === ENUM_APP_ENVIRONMENT.PRODUCTION;

    return {
      type: 'postgres',
      host: this.configService.get<string>('postgres.host'),
      port: this.configService.get<number>('postgres.port'),
      username: this.configService.get<string>('postgres.username'),
      password: this.configService.get<string>('postgres.password'),
      database: this.configService.get<string>('postgres.name'),
      synchronize: !isProd,
      logging: !isProd,
      entities: [join(__dirname, 'entities', '*.entity-orm.{ts,js}')],
      ssl: isProd ? { rejectUnauthorized: false } : false,
      extra: {
        max: 10, // Pool size
        connectionTimeoutMillis: 3000,
      },
      retryAttempts: 3,
      retryDelay: 1000,
    };
  }
}
