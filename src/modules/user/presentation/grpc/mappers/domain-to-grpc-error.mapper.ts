import { RpcException } from '@nestjs/microservices';
import { status, Metadata } from '@grpc/grpc-js';
import { ExceptionBase } from '@base/exceptions';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from '@module/user/domain/errors/user.errors';
import { ERROR_CODES } from '@base/exceptions/error.codes';

type GrpcExceptionHandler = (error: ExceptionBase) => RpcException;

function buildGrpcMetadata(error: ExceptionBase, code: string): Metadata {
  const metadata = new Metadata();
  metadata.set('errorCode', code);
  metadata.set('correlationId', error.correlationId);
  if (error.metadata) {
    metadata.set('metadata', JSON.stringify(error.metadata));
  }
  return metadata;
}

export class DomainToGrpcErrorMapper {
  private static readonly errorMap = new Map<Function, GrpcExceptionHandler>([
    [
      UserNotFoundError,
      (error) =>
        new RpcException({
          code: status.NOT_FOUND,
          message: error.message,
          metadata: buildGrpcMetadata(error, ERROR_CODES.USER.NOT_FOUND),
        }),
    ],
    [
      UserAlreadyExistsError,
      (error) =>
        new RpcException({
          code: status.ALREADY_EXISTS,
          message: error.message,
          metadata: buildGrpcMetadata(error, ERROR_CODES.USER.ALREADY_EXISTS),
        }),
    ],
  ]);

  static map(error: Error): RpcException {
    for (const [ErrorClass, handler] of this.errorMap.entries()) {
      if (error instanceof ErrorClass) {
        return handler(error as ExceptionBase);
      }
    }

    // fallback
    const fallback = new Metadata();
    fallback.set('errorCode', ERROR_CODES.GENERIC.INTERNAL_SERVER_ERROR);
    fallback.set('correlationId', Math.random().toString(36).substring(2, 15));

    return new RpcException({
      code: status.INTERNAL,
      message: error.message || 'Internal server error',
      metadata: fallback,
    });
  }
}
