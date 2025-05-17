import { ExceptionBase } from '@base/exceptions';

export class UserAlreadyExistsError extends ExceptionBase {
  static readonly message: string = 'User already exists';
  public readonly code: string = 'USER.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsError.message, cause, metadata);
  }
}

export class UserNotFoundError extends ExceptionBase {
  static readonly message: string = 'User not found';
  public readonly code: string = 'USER.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotFoundError.message, cause, metadata);
  }
}
