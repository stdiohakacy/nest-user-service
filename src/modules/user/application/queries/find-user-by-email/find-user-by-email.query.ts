import { IQuery } from '@nestjs/cqrs';
import { FindUserByEmailGrpcRequestDto } from '@module/user/presentation/grpc/dtos/request/find-user-by-email.grpc-request.dto';

export class FindUserByEmailQuery implements IQuery {
  constructor(public readonly dto: FindUserByEmailGrpcRequestDto) {}
}
