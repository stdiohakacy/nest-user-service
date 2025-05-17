import { BASE_SCHEMA } from '@base/infrastructure/typeorm/schema/base.schema';

export const USER_SCHEMA = {
  TABLE_NAME: 'users',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password',
  },
  RELATED_ONE: {},
  RELATED_MANY: {},
};
