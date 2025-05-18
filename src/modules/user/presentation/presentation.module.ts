import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { GrpcUserController } from './grpc/controllers/grpc.user.controller';
import { UserMapper } from '../infrastructure/persistence/typeorm/mappers/user.mapper';

const mappers = [UserMapper];

@Module({
  imports: [ApplicationModule],
  controllers: [GrpcUserController],
  providers: [...mappers],
  exports: [],
})
export class PresentationModule {}
