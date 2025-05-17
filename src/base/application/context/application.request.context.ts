import { RequestContext } from 'nestjs-request-context';

/**
 * Setting some isolated context for each request.
 */
export class ApplicationRequestContext extends RequestContext {
  requestId: string;
  //   transactionConnection?: DatabaseTransactionConnection; // For global transactions
}

export class ApplicationRequestContextService {
  static getContext(): ApplicationRequestContext {
    const ctx: ApplicationRequestContext = RequestContext.currentContext.req;
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    return this.getContext().requestId;
  }

  //   static getTransactionConnection(): DatabaseTransactionConnection | undefined {
  //     const ctx = this.getContext();
  //     return ctx.transactionConnection;
  //   }

  //   static setTransactionConnection(
  //     transactionConnection?: DatabaseTransactionConnection,
  //   ): void {
  //     const ctx = this.getContext();
  //     ctx.transactionConnection = transactionConnection;
  //   }

  //   static cleanTransactionConnection(): void {
  //     const ctx = this.getContext();
  //     ctx.transactionConnection = undefined;
  //   }
}
