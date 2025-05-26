import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';
import { Logger, NestApplicationOptions, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import { useContainer, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AppEnvDto } from './app/dtos/app.env.dto';
import { GrpcRequestIdInterceptor } from './shared/request/interceptors/grpc.request.id.interceptor';
import { GrpcResponseTimeInterceptor } from './shared/request/interceptors/grpc.response-time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    bufferLogs: false,
  } as NestApplicationOptions);

  const configService = app.get(ConfigService);

  const grpcHost: string = configService.get<string>('app.grpc.host');
  const grpcPort: number = configService.get<number>('app.grpc.port');
  const env: string = configService.get<string>('app.env');
  const timezone: string = configService.get<string>('app.timezone');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versioningPrefix: string = configService.get<string>(
    'app.urlVersion.prefix',
  );
  const version: string = configService.get<string>('app.urlVersion.version');
  const versionEnable: string = configService.get<string>(
    'app.urlVersion.enable',
  );

  const logger = new Logger('Nest-User-Srv-Main');
  process.env.NODE_ENV = env;
  process.env.TZ = timezone;

  // Compression
  app.use(compression());

  // Global
  app.setGlobalPrefix(globalPrefix);

  // For Custom Validation
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Versioning
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }

  // Validate Env
  const classEnv = plainToInstance(AppEnvDto, process.env);

  const errors = await validate(classEnv);
  if (errors.length > 0) {
    logger.error(errors);
    throw new Error('Env Variable Invalid');
  }

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${grpcHost}:${grpcPort}`,
        package: 'user',
        protoPath: join(
          __dirname,
          'modules/user/presentation/grpc/protos/user.proto',
        ),
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
  );

  const requestIdInterceptor = grpcApp.get(GrpcRequestIdInterceptor);
  const responseTimeInterceptor = grpcApp.get(GrpcResponseTimeInterceptor);
  grpcApp.useGlobalInterceptors(requestIdInterceptor, responseTimeInterceptor);

  grpcApp.listen();

  console.log(`gRPC Server started on ${grpcHost}:${grpcPort}`);

  return;
}
bootstrap();
