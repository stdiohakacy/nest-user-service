import { UserResponseDto } from '@base/presentation/grpc/response/user.response.dto';
import { UserEntity } from '@module/user/domain/aggregates/user.aggregate';

export class UserPresentationMapper {
  static toResponse(user: UserEntity): UserResponseDto {
    const props = user.getProps();

    const response = new UserResponseDto(user);
    response.email = props.email;
    response.name = props.name;

    return response;
  }
}
