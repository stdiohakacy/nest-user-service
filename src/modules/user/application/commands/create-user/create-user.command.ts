import { ICommand } from '@nestjs/cqrs';
import { CreateUserGrpcRequestDto } from '@module/user/presentation/grpc/dtos/request/create-user.grpc-request.dto';

export class CreateUserCommand implements ICommand {
  constructor(public readonly dto: CreateUserGrpcRequestDto) {}
}
