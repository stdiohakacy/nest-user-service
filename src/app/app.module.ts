import { Module } from '@nestjs/common';
import { FeatureModule } from '../modules/feature.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import configs from '../configs';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    CqrsModule.forRoot(),
    RequestModule,
    FeatureModule,
  ],
  providers: [],
})
export class AppModule {}
