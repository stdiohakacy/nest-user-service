import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import {
  UserNotFoundError,
  UserAlreadyExistsError,
} from '@module/user/domain/errors/user.errors';

type GrpcExceptionHandler = (error: Error) => RpcException;

export class DomainToGrpcErrorMapper {
  private static readonly errorMap = new Map<Function, GrpcExceptionHandler>([
    [
      UserNotFoundError,
      (error) =>
        new RpcException({
          code: status.NOT_FOUND,
          message: error.message,
        }),
    ],
    [
      UserAlreadyExistsError,
      (error) =>
        new RpcException({
          code: status.ALREADY_EXISTS,
          message: error.message,
        }),
    ],
  ]);

  static map(error: Error): RpcException {
    for (const [ErrorClass, handler] of this.errorMap.entries()) {
      if (error instanceof ErrorClass) {
        return handler(error);
      }
    }

    // fallback
    return new RpcException({
      code: status.INTERNAL,
      message: error.message || 'Internal server error',
    });
  }
}
