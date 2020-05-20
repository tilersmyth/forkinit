import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { DateScalar } from './base/date.scalar';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CoreModule, CompanyModule],
  providers: [DateScalar],
})
export class AppModule {}
