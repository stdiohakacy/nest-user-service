import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { GrpcUserController } from './grpc/controllers/grpc.user.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [GrpcUserController],
  providers: [],
  exports: [],
})
export class PresentationModule {}
