import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { IsAdminAlreadyExist } from './admin.validator';
import { AdminEntity } from './admin.entity';
import { ConfigModule } from '../core/config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), ConfigModule],
  providers: [AdminService, IsAdminAlreadyExist, AdminResolver],
  exports: [AdminService],
})
export class AdminModule {}
