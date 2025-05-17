import { BaseEntity } from '@base/infrastructure/typeorm/schema/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { USER_SCHEMA } from '../schemas/user.schema';

@Entity(USER_SCHEMA.TABLE_NAME)
export class UserEntityOrm extends BaseEntity {
  @Column({
    name: USER_SCHEMA.COLUMNS.NAME,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: USER_SCHEMA.COLUMNS.EMAIL,
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    name: USER_SCHEMA.COLUMNS.PASSWORD,
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;
}
