import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok, Option, Result } from 'oxide.ts';
import { FindUserByEmailQuery } from '../find-user-by-email.query';
import { UserRepositoryPort } from '../../../ports/user.repository.port';
import { UserEntity } from '@module/user/domain/aggregates/user.aggregate';
import { UserNotFoundError } from '@module/user/domain/errors/user.errors';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY_PORT } from 'src/di/di.token';

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailQueryHandler
  implements IQueryHandler<FindUserByEmailQuery, Result<UserEntity, Error>>
{
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(
    query: FindUserByEmailQuery,
  ): Promise<Result<UserEntity, Error>> {
    try {
      const { email } = query.dto;

      const user: Option<UserEntity> =
        await this.userRepository.findOneByEmail(email);

      if (user.isNone()) {
        return Err(new UserNotFoundError());
      }

      return Ok(user.unwrap());
    } catch (error) {
      return Err(error);
    }
  }
}
