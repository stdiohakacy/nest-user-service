import { ExceptionBase } from '@base/exceptions';

export class UserAlreadyExistsError extends ExceptionBase {
  static readonly message: string = 'User already exists';
  public readonly code: string = 'USER.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsError.message, cause, metadata);
  }
}
