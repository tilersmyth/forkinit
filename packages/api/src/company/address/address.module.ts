import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyAddressEntity } from './address.entity';
import { CompanyAddressService } from './address.service';
import { CompanyAddressResolver } from './address.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyAddressEntity])],
  providers: [CompanyAddressService, CompanyAddressResolver],
  exports: [],
})
export class CompanyAddressModule {}
