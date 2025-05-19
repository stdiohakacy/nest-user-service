import { Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './persistence/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityOrm } from './persistence/typeorm/entities/user.entity-orm';

@Module({
  imports: [TypeOrmDatabaseModule, TypeOrmModule.forFeature([UserEntityOrm])],
  exports: [TypeOrmDatabaseModule, TypeOrmModule],
})
export class InfrastructureModule {}
