import { MapperInterface } from '@base/domain/mappers/mapper.interface';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@module/user/domain/aggregates/user.aggregate';
import { UserEntityOrm } from '../entities/user.entity-orm';
import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';
import { UserResponseDto } from '@base/presentation/grpc/response/user.response.dto';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */
@Injectable()
export class UserMapper
  implements MapperInterface<UserEntity, UserEntityOrm, UserResponseDto>
{
  toPersistence(entity: UserEntity): UserEntityOrm {
    const props = entity.getProps();

    const userOrm = new UserEntityOrm();

    userOrm.id = entity.id.toString();
    userOrm.name = props.name;
    userOrm.email = props.email;
    userOrm.password = props.password;
    userOrm.createdAt = props.createdAt;
    userOrm.updatedAt = props.updatedAt;
    userOrm.deletedAt = props.deletedAt;

    return userOrm;
  }

  toDomain(ormEntity: UserEntityOrm): UserEntity {
    const entity = new UserEntity({
      id: new BaseUniqueEntityId(ormEntity.id),
      createdAt: ormEntity.createdAt,
      updatedAt: ormEntity.updatedAt,
      deletedAt: ormEntity.deletedAt,
      props: {
        email: ormEntity.email,
        name: ormEntity.name,
        password: ormEntity.password,
      },
    });

    return entity;
  }

  toResponse(entity: UserEntity): UserResponseDto {
    const props = entity.getProps();

    const response = new UserResponseDto(entity);
    response.email = props.email;
    response.name = props.name;

    return response;
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
