import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, unknown> => ({
    name: process.env.USER_SRV_APP_NAME,
    env: process.env.USER_SRV_APP_ENV,
    timezone: process.env.USER_SRV_APP_TIMEZONE,
    globalPrefix: '/api',

    grpc: {
      host: process.env.USER_SRV_GRPC_HOST,
      port: Number.parseInt(process.env.USER_SRV_GRPC_PORT),
    },
    urlVersion: {
      enable: process.env.USER_SRV_URL_VERSIONING_ENABLE === 'true',
      prefix: 'v',
      version: process.env.USER_SRV_URL_VERSION,
    },
  }),
);
