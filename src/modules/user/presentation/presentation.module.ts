import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { GrpcUserController } from './grpc/controllers/grpc.user.controller';
import { UserInfraMapper } from '../infrastructure/persistence/typeorm/mappers/user.infra.mapper';

const mappers = [UserInfraMapper];

@Module({
  imports: [ApplicationModule],
  controllers: [GrpcUserController],
  providers: [...mappers],
  exports: [],
})
export class PresentationModule {}
