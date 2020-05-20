import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderPointService } from './order-point.service';
import { OrderPointEntity } from './order-point.entity';
import { IsLabelAlreadyExist } from './order-point.validator';
import { OrderPointResolver } from './order-point.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OrderPointEntity])],
  providers: [IsLabelAlreadyExist, OrderPointService, OrderPointResolver],
  exports: [],
})
export class OrderPointModule {}
