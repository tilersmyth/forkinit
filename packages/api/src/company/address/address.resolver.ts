import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { Company } from '../company.decorator';
import { CompanyAddressService } from './address.service';
import { CompanyAddressEntity } from './address.entity';
import { CompanyEntity } from '../company.entity';
import { CompanyAddressInput } from './inputs/address.input';

@Resolver(() => CompanyAddressEntity)
export class CompanyAddressResolver {
  constructor(private readonly addressService: CompanyAddressService) {}

  @Mutation(() => CompanyAddressEntity)
  async createCompanyAddress(
    @Company() company: CompanyEntity,
    @Args('input') input: CompanyAddressInput,
  ) {
    return this.addressService.createAddress(company, input);
  }
}
