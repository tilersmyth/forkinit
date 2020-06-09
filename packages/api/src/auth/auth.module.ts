import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [AdminModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
