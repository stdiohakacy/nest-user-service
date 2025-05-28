import { registerAs } from '@nestjs/config';

export default registerAs(
  'postgres',
  (): Record<string, any> => ({
    host: process.env.USER_SRV_POSTGRES_HOST,
    port: parseInt(process.env.USER_SRV_POSTGRES_PORT),
    username: process.env.USER_SRV_POSTGRES_USER,
    password: process.env.USER_SRV_POSTGRES_PASSWORD,
    name: process.env.USER_SRV_POSTGRES_DB,
  }),
);
