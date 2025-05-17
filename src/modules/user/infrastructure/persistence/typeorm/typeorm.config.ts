import 'tsconfig-paths/register';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const pomTypeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cornal_pom_db',
  entities: [join(__dirname, 'entities', '*.entity-orm.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
  logging: true,

  extra: {
    max: 20,
    min: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  },
};

export default new DataSource({ ...pomTypeormConfig, synchronize: false });
