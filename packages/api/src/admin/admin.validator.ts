import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { AdminService } from './admin.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class IsAdminAlreadyExist implements ValidatorConstraintInterface {
  private adminService?: AdminService;
  constructor(private readonly moduleRef: ModuleRef) {}

  public async validate(value: string, { property }: any) {
    if (!this.adminService) {
      const adminService: AdminService | undefined = this.moduleRef.get(
        'AdminService',
      );

      if (!adminService) {
        throw new Error('unable to load admin service');
      }

      this.adminService = adminService;
    }

    const admin = await this.adminService.findOne({
      where: { [property]: value },
    });

    return !admin;
  }

  defaultMessage() {
    return '$value is associated with existing account';
  }
}
