import { RepositoryPort } from '@base/application/ports/repository.port';
import { UserEntity } from '../../domain/aggregates/user.aggregate';
import { UserEntityOrm } from '../../infrastructure/persistence/typeorm/entities/user.entity-orm';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntityOrm | null>;
}
