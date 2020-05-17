import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { DateScalar } from './base/date.scalar';

@Module({
  imports: [CoreModule, UserModule],
  providers: [DateScalar],
})
export class AppModule {}
