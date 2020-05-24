import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { CompanyMiddleware } from './company.middleware';
import { EmployeeModule } from './employee/employee.module';
import { CompanyAddressModule } from './address/address.module';
import { OrderPointModule } from './order-point/order-point.module';
import { EmployeeAdminMiddleware } from './employee/middlewares/admin.middleware';
import { EmployeeStaffMiddleware } from './employee/middlewares/staff.middleware';

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
      .apply(
        CompanyMiddleware,
        EmployeeAdminMiddleware,
        EmployeeStaffMiddleware,
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
