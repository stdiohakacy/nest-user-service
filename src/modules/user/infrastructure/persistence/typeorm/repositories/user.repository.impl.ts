import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepositoryImpl } from '@base/infrastructure/typeorm/repository/repository.impl';
import { UserEntity } from '@module/user/domain/aggregates/user.aggregate';
import { UserRepositoryPort } from '@module/user/application/ports/user.repository.port';
import { Injectable } from '@nestjs/common';
import { None, Option, Some } from 'oxide.ts';
import { UserInfraMapper } from '../mappers/user.infra.mapper';
import { USER_SCHEMA } from '../schemas/user.schema';
import { UserEntityOrm } from '../entities/user.entity-orm';

@Injectable()
export class UserRepositoryImpl
  extends BaseRepositoryImpl<UserEntity, UserEntityOrm>
  implements UserRepositoryPort
{
  constructor(
    @InjectRepository(UserEntityOrm)
    private readonly userRepository: Repository<UserEntityOrm>,
  ) {
    super(userRepository, USER_SCHEMA, new UserInfraMapper());
  }

  async findOneByEmail(email: string): Promise<Option<UserEntity>> {
    try {
      const userOrm = await this.userRepository.findOne({
        where: { email },
      });

      if (!userOrm) {
        return None;
      }

      const user: UserEntity = this.mapper.toDomain(userOrm);

      return Some(user);
    } catch (error) {
      console.error(error);
    }
  }
}
