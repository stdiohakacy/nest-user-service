import { Module } from '@nestjs/common';
import { FeatureModule } from '../modules/feature.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule.forRoot(), FeatureModule],
  providers: [],
})
export class AppModule {}
