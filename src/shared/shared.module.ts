import { Global, Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';

@Global()
@Module({
  imports: [RequestModule.forRoot()],
})
export class SharedModule {}
