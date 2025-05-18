import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormModule } from './persistence/typeorm/typeorm.module';
import { UserEntityOrm } from './persistence/typeorm/entities/user.entity-orm';

@Module({
  imports: [TypeormModule, TypeOrmModule.forFeature([UserEntityOrm])],
  exports: [TypeOrmModule, TypeormModule],
})
export class InfrastructureModule {}
