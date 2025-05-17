import { RepositoryPort } from '@base/application/ports/repository.port';
import { UserEntity } from '../../domain/aggregates/user.aggregate';
import { Option } from 'oxide.ts';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<Option<UserEntity>>;
}
