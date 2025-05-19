import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { match, Result } from 'oxide.ts';
import { FindUserByEmailQuery } from '@module/user/application/queries/find-user-by-email/find-user-by-email.query';
import { UserEntity } from '@module/user/domain/aggregates/user.aggregate';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from '@module/user/domain/errors/user.errors';
import { FindUserByEmailGrpcRequestDto } from '../dtos/request/find-user-by-email.grpc-request.dto';
import { UserResponseDto } from '@base/presentation/grpc/response/user.response.dto';
import { UserMapper } from '@module/user/infrastructure/persistence/typeorm/mappers/user.mapper';
import { CreateUserGrpcRequestDto } from '../dtos/request/create-user.grpc-request.dto';
import { IdResponseDto } from '@base/presentation/grpc/response/id.response.dto';
import { CreateUserCommand } from '@module/user/application/commands/create-user/create-user.command';
import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';
import { DomainToGrpcErrorMapper } from '../mappers/domain-to-grpc-error.mapper';

@Controller()
export class GrpcUserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly userMapper: UserMapper,
  ) {}

  @GrpcMethod('UserService', 'FindUserByEmail')
  async findUserByEmail(
    dto: FindUserByEmailGrpcRequestDto,
  ): Promise<UserResponseDto> {
    const result: Result<UserEntity, UserNotFoundError> =
      await this.queryBus.execute(new FindUserByEmailQuery(dto));
    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: (user: UserEntity) => this.userMapper.toResponse(user),
      Err: (error: Error) => {
        throw DomainToGrpcErrorMapper.map(error);
      },
    });
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(dto: CreateUserGrpcRequestDto): Promise<IdResponseDto> {
    const result: Result<string, UserAlreadyExistsError> =
      await this.commandBus.execute(new CreateUserCommand(dto));

    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: (id: string) => new IdResponseDto(new BaseUniqueEntityId(id)),
      Err: (error: Error) => {
        throw DomainToGrpcErrorMapper.map(error);
      },
    });
  }
}
