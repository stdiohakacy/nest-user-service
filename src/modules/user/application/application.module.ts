import { Module, Provider } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { userQueryHandlers } from './queries/find-user-by-email/handlers';
import { USER_REPOSITORY } from '../di/user.di.token';
import { UserRepositoryImpl } from '../infrastructure/persistence/typeorm/repositories/user.repository.impl';

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
];

const providers = [...userQueryHandlers, ...repositories];

@Module({
  imports: [InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
