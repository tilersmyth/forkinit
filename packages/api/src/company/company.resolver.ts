import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CompanyService } from './company.service';
import { CompanyEntity } from './company.entity';
import { Company } from './company.decorator';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../admin/admin.guard';

@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => CompanyEntity)
  async findCompany(@Company() company: CompanyEntity): Promise<CompanyEntity> {
    return company;
  }

  @Mutation(() => CompanyEntity)
  @UseGuards(AdminGuard)
  async createCompany(@Args('name') name: string) {
    return this.companyService.save({ name });
  }
}
