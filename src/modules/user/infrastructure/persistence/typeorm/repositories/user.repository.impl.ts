import { InjectRepository } from '@nestjs/typeorm';
import { UserEntityOrm } from '../entities/user.entity-orm';
import { Repository } from 'typeorm';
import { USER_SCHEMA } from '../schemas/user.schema';
import { BaseRepositoryImpl } from '@base/infrastructure/typeorm/repository/repository.impl';
import { UserEntity } from 'src/modules/user/domain/aggregates/user.aggregate';
import { UserRepositoryPort } from 'src/modules/user/application/ports/user.repository.port';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { None, Option, Some } from 'oxide.ts';

@Injectable()
export class UserRepositoryImpl
  extends BaseRepositoryImpl<UserEntity, UserEntityOrm>
  implements UserRepositoryPort
{
  constructor(
    @InjectRepository(UserEntityOrm)
    private readonly userRepository: Repository<UserEntityOrm>,
  ) {
    super(userRepository, USER_SCHEMA, new UserMapper());
  }

  async findOneByEmail(email: string): Promise<Option<UserEntity>> {
    try {
      const userOrm = await this.userRepository.findOne({
        where: { email },
      });

      if (!userOrm) {
        return None;
      }

      const user = this.mapper.toDomain(userOrm);

      return Some(user);
    } catch (error) {
      console.error(error);
    }
  }
}
