import { Module, Provider } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { userQueryHandlers } from './queries/find-user-by-email/handlers';
import { LOGGER_PORT, USER_REPOSITORY_PORT } from '../../../di/di.token';
import { userCommandHandlers } from './commands/create-user/handlers';
import { UserRepositoryImpl } from '../infrastructure/persistence/typeorm/repositories/user.repository.impl';
import { PinoLoggerAdapter } from '@shared/logger/pino.logger.adapter';

const ports: Provider[] = [
  {
    provide: USER_REPOSITORY_PORT,
    useClass: UserRepositoryImpl,
  },
  {
    provide: LOGGER_PORT,
    useClass: PinoLoggerAdapter,
  },
];

const providers = [...userQueryHandlers, ...userCommandHandlers, ...ports];

@Module({
  imports: [InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
