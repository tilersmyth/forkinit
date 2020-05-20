import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { OrderPointService } from './order-point.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class IsLabelAlreadyExist implements ValidatorConstraintInterface {
  private orderPointService?: OrderPointService;
  constructor(private readonly moduleRef: ModuleRef) {}

  public async validate(label: string, { object }: any) {
    if (!this.orderPointService) {
      const orderPointService:
        | OrderPointService
        | undefined = this.moduleRef.get('OrderPointService');

      if (!orderPointService) {
        throw new Error();
      }

      this.orderPointService = orderPointService;
    }

    // Make sure OrderPoint label is unique within company
    const orderPoint = await this.orderPointService.findOne({
      where: { label: label.trim(), company: object.company },
    });

    return !orderPoint;
  }

  defaultMessage() {
    return '$value is associated with existing order point';
  }
}
