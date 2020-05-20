import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeEntity } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { IsNicknameAlreadyExist } from './employee.validator';
import { UserModule } from '../../shared/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity]), UserModule],
  providers: [IsNicknameAlreadyExist, EmployeeService, EmployeeResolver],
  exports: [EmployeeService],
})
export class EmployeeModule {}
