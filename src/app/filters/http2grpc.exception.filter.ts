import { status, Metadata } from '@grpc/grpc-js';
import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ExceptionBase } from '@base/exceptions';
import { ERROR_CODES } from '@base/exceptions/error.codes';

@Catch(HttpException)
export class Http2gRPCExceptionFilter implements ExceptionFilter {
  static HttpStatusCode: Record<number, number> = {
    [HttpStatus.BAD_REQUEST]: status.INVALID_ARGUMENT,
    [HttpStatus.UNAUTHORIZED]: status.UNAUTHENTICATED,
    [HttpStatus.FORBIDDEN]: status.PERMISSION_DENIED,
    [HttpStatus.NOT_FOUND]: status.NOT_FOUND,
    [HttpStatus.CONFLICT]: status.ALREADY_EXISTS,
    [HttpStatus.GONE]: status.ABORTED,
    [HttpStatus.TOO_MANY_REQUESTS]: status.RESOURCE_EXHAUSTED,
    499: status.CANCELLED,
    [HttpStatus.INTERNAL_SERVER_ERROR]: status.INTERNAL,
    [HttpStatus.NOT_IMPLEMENTED]: status.UNIMPLEMENTED,
    [HttpStatus.BAD_GATEWAY]: status.UNKNOWN,
    [HttpStatus.SERVICE_UNAVAILABLE]: status.UNAVAILABLE,
    [HttpStatus.GATEWAY_TIMEOUT]: status.DEADLINE_EXCEEDED,
    [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: status.UNAVAILABLE,
    [HttpStatus.PAYLOAD_TOO_LARGE]: status.OUT_OF_RANGE,
    [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: status.CANCELLED,
    [HttpStatus.UNPROCESSABLE_ENTITY]: status.CANCELLED,
    [HttpStatus.METHOD_NOT_ALLOWED]: status.CANCELLED,
    [HttpStatus.PRECONDITION_FAILED]: status.FAILED_PRECONDITION,
  };

  catch(exception: HttpException): Observable<never> {
    const httpStatus = exception.getStatus();
    const grpcStatus =
      Http2gRPCExceptionFilter.HttpStatusCode[httpStatus] ?? status.UNKNOWN;

    const response = exception.getResponse() as any;
    const isDomainError = exception instanceof ExceptionBase;

    const metadata = new Metadata();
    metadata.set(
      'errorCode',
      isDomainError
        ? exception.code
        : ERROR_CODES.GENERIC.INTERNAL_SERVER_ERROR,
    );
    metadata.set(
      'correlationId',
      isDomainError
        ? exception.correlationId
        : Math.random().toString(36).substring(2, 15),
    );
    if (isDomainError && exception.metadata) {
      metadata.set('metadata', JSON.stringify(exception.metadata));
    }

    const rpcException = new RpcException({
      code: grpcStatus,
      message:
        response?.message || exception.message || 'Internal server error',
      metadata,
    });

    return throwError(() => rpcException);
  }
}
