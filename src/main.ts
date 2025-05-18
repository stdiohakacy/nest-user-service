import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';
import { NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    bufferLogs: false,
  } as NestApplicationOptions);

  const configService = app.get(ConfigService);

  const grpcHost: string = configService.get<string>('app.grpc.host');
  const grpcPort: number = configService.get<number>('app.grpc.port');

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

  grpcApp.listen();
  console.log('gRPC Server started on port 6000');

  await app.listen(3000);
  console.log('App started on port 3000');
}
bootstrap();
