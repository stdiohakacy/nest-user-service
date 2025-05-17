import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

const providers = [];

@Module({
  imports: [InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
