import { Module } from '@nestjs/common';
import { FeatureModule } from './modules/feature.module';

@Module({
  imports: [FeatureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
