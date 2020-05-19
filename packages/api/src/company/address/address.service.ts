import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '../../base/crud.service';
import { CompanyAddressEntity } from './address.entity';
import { CompanyEntity } from '../company.entity';
import { CompanyAddressInput } from './inputs/address.input';

@Injectable()
export class CompanyAddressService extends CrudService<CompanyAddressEntity> {
  constructor(
    @InjectRepository(CompanyAddressEntity)
    protected readonly repository: Repository<CompanyAddressEntity>,
  ) {
    super();
  }

  public createAddress(
    company: CompanyEntity,
    input: CompanyAddressInput,
  ): Promise<CompanyAddressEntity> {
    const address = new CompanyAddressEntity();
    Object.assign(address, input);
    address.company = company;
    return this.save(address);
  }
}
