import { MapperInterface } from '@base/domain/mappers/mapper.interface';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/aggregates/user.aggregate';
import { UserEntityOrm } from '../entities/user.entity-orm';
import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';

@Injectable()
export class UserMapper implements MapperInterface<UserEntity, UserEntityOrm> {
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
}
