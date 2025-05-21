import { CreateUserCommand } from './../create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Option, Result } from 'oxide.ts';
import { UserRepositoryPort } from '../../../ports/user.repository.port';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY_PORT } from 'src/di/di.token';
import { UserAlreadyExistsError } from '@module/user/domain/errors/user.errors';
import { UserEntity } from '@module/user/domain/aggregates/user.aggregate';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements
    ICommandHandler<CreateUserCommand, Result<string, UserAlreadyExistsError>>
{
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<string, UserAlreadyExistsError>> {
    const { dto } = command;

    const user = UserEntity.create({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });

    // Check if user already exists

    try {
      const existingUser: Option<UserEntity> =
        await this.userRepository.findOneByEmail(dto.email);
      if (existingUser.isSome()) {
        return Err(new UserAlreadyExistsError());
      }
      /* TODO: Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.userRepository.save(user);
      return Ok(user.id.toString());
    } catch (error) {
      return Err(error);
    }
  }
}
