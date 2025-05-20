import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindUserByEmailGrpcRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
