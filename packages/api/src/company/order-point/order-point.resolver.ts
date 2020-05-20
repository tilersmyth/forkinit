import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { Company } from '../company.decorator';
import { CompanyEntity } from '../company.entity';
import { OrderPointInput } from './inputs/order-point.input';
import { OrderPointEntity } from './order-point.entity';
import { OrderPointService } from './order-point.service';

@Resolver(() => OrderPointEntity)
export class OrderPointResolver {
  constructor(private readonly orderPointService: OrderPointService) {}

  @Mutation(() => OrderPointEntity)
  async createOrderPoint(
    @Company() company: CompanyEntity,
    @Args('input') input: OrderPointInput,
  ) {
    return this.orderPointService.save({ company, ...input });
  }
}
