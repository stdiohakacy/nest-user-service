import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import {
  UserNotFoundError,
  UserAlreadyExistsError,
} from '@module/user/domain/errors/user.errors';

export class DomainToGrpcErrorMapper {
  static map(error: Error): RpcException {
    if (error instanceof UserNotFoundError) {
      return new RpcException({
        code: status.NOT_FOUND,
        message: error.message,
      });
    }

    if (error instanceof UserAlreadyExistsError) {
      return new RpcException({
        code: status.ALREADY_EXISTS,
        message: error.message,
      });
    }

    // Default fallback
    return new RpcException({
      code: status.INTERNAL,
      message: error.message || 'Internal server error',
    });
  }
}
