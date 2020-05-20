import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { CompanyMiddleware } from './company.middleware';
import { EmployeeModule } from './employee/employee.module';
import { CompanyAddressModule } from './address/address.module';
import { OrderPointModule } from './order-point/order-point.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    EmployeeModule,
    CompanyAddressModule,
    OrderPointModule,
  ],
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
