import { ExceptionBase } from '@base/exceptions';
import { ERROR_CODES } from '@base/exceptions/error.codes';

export class UserAlreadyExistsError extends ExceptionBase {
  static readonly message: string = 'User already exists';
  readonly code = ERROR_CODES.USER.ALREADY_EXISTS;

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsError.message, cause, metadata);
  }
}

export class UserNotFoundError extends ExceptionBase {
  static readonly message: string = 'User not found';
  public readonly code: string = ERROR_CODES.USER.NOT_FOUND;

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotFoundError.message, cause, metadata);
  }
}
