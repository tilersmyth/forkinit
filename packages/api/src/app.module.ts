import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { DateScalar } from './base/date.scalar';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CoreModule, UserModule, CompanyModule],
  providers: [DateScalar],
})
export class AppModule {}
