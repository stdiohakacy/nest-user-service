import {
  DynamicModule,
  HttpStatus,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

@Module({})
export class RequestModule {
  static forRoot(): DynamicModule {
    return {
      module: RequestModule,
      controllers: [],
      providers: [
        {
          provide: APP_PIPE,
          useFactory: () =>
            new ValidationPipe({
              transform: true,
              skipUndefinedProperties: true,
              forbidUnknownValues: true,
            }),
        },
      ],
    };
  }
}
