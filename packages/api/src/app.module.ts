import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { DateScalar } from './base/date.scalar';
import { CompanyModule } from './company/company.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [CoreModule, CompanyModule, AdminModule],
  providers: [DateScalar],
})
export class AppModule {}
