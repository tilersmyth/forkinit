import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { CompanyMiddleware } from './company.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyService, CompanyResolver],
  exports: [],
})
export class CompanyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CompanyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
