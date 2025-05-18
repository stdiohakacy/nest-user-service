import { status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { match, Result } from 'oxide.ts';
import { FindUserByEmailQuery } from 'src/modules/user/application/queries/find-user-by-email/find-user-by-email.query';
import { UserEntity } from 'src/modules/user/domain/aggregates/user.aggregate';
import { UserNotFoundError } from 'src/modules/user/domain/errors/user.errors';
import { FindUserByEmailGrpcRequestDto } from '../dtos/request/find-user-by-email.grpc-request.dto';

@Controller()
export class GrpcUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @GrpcMethod('UserService', 'FindUserByEmail')
  async findUserByEmail(dto: FindUserByEmailGrpcRequestDto) {
    const result: Result<UserEntity, Error> = await this.queryBus.execute(
      new FindUserByEmailQuery(dto),
    );
    // Deciding what to do with a Result (similar to Rust matching)
    // if Ok we return a response with an id
    // if Error decide what to do with it depending on its type
    return match(result, {
      Ok: (user: UserEntity) => user,
      Err: (error: Error) => {
        if (error instanceof UserNotFoundError) {
          throw new RpcException({
            code: status.NOT_FOUND,
            message: error.message,
          });
        }

        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      },
    });
  }
}
