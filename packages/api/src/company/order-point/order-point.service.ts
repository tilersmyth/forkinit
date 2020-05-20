import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '../../base/crud.service';
import { OrderPointEntity } from './order-point.entity';

@Injectable()
export class OrderPointService extends CrudService<OrderPointEntity> {
  constructor(
    @InjectRepository(OrderPointEntity)
    protected readonly repository: Repository<OrderPointEntity>,
  ) {
    super();
  }
}
