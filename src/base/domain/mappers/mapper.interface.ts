import {
  BaseEntity as BaseDomainEntity,
  BaseEntityProps,
} from '../entities/base.entity';

export interface MapperInterface<
  DomainEntity extends BaseDomainEntity<unknown>,
  OrmEntity,
  Response = any,
> {
  toPersistence(entity: DomainEntity): OrmEntity;
  toDomain(ormEntity: OrmEntity): DomainEntity;
  toResponse(entity: DomainEntity): Response;
}
