import { BaseAggregateRoot } from '@base/domain/aggregates/base.aggregate';
import { BaseUniqueEntityId } from '@base/domain/identifier/base.unique-entity.id';
import { randomUUID } from 'crypto';

export interface UserProps {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export class UserEntity extends BaseAggregateRoot<UserProps> {
  protected readonly _id: BaseUniqueEntityId;

  static create(create: CreateUserProps): UserEntity {
    const id = new BaseUniqueEntityId(randomUUID());
    const props: UserProps = {
      ...create,
    };
    const user = new UserEntity({ id, props });

    return user;
  }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
    throw new Error('Method not implemented.');
  }
}
