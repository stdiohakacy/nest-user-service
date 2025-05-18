import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '[::]:6000',
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
  console.log('App started on port 3000');
}
bootstrap();
