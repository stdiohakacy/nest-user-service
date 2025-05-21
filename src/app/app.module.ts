import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FeatureModule } from '../modules/feature.module';
import configs from '../configs';
import { RequestModule } from '../common/request/request.module';
import { AppMiddlewareModule } from './app.middleware.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    AppMiddlewareModule,
    CqrsModule.forRoot(),
    RequestModule.forRoot(),
    FeatureModule,
  ],
  providers: [],
})
export class AppModule {}
