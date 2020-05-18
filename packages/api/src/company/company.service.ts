import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '../base/crud.service';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanyService extends CrudService<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    protected readonly repository: Repository<CompanyEntity>,
  ) {
    super();
  }
}
