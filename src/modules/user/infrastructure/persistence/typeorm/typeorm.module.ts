import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './typeorm.config';
import { UserEntityOrm } from './entities/user.entity-orm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TypeormConfig,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([UserEntityOrm]),
  ],
})
export class TypeormModule {}
