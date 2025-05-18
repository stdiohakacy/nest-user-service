import { registerAs } from '@nestjs/config';

export default registerAs(
  'middleware.grpc',
  (): Record<string, unknown> => ({
    throttle: {
      limit: 10,
      ttl: 500, // or metadata-based approach
    },
    maxMessageSize: 1_000_000, // 1MB
    timeout: 10_000, // 10s for server/client timeout
  }),
);
