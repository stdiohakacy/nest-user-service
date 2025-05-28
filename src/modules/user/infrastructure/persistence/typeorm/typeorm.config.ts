import 'tsconfig-paths/register';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const TypeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest-user-db',
  entities: [join(__dirname, 'entities', '*.entity-orm.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: false,
  logging: true,
};

export default new DataSource({ ...TypeormConfig, synchronize: false });
