import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { EmployeeService } from './employee.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class IsNicknameAlreadyExist implements ValidatorConstraintInterface {
  private employeeService?: EmployeeService;
  constructor(private readonly moduleRef: ModuleRef) {}

  public async validate(nickname: string, { object }: any) {
    if (!this.employeeService) {
      const employeeService: EmployeeService | undefined = this.moduleRef.get(
        'EmployeeService',
      );

      if (!employeeService) {
        throw new Error();
      }

      this.employeeService = employeeService;
    }

    // Make sure nickname is unique within company
    const employee = await this.employeeService.findOne({
      where: { nickname, company: object.company },
    });

    return !employee;
  }

  defaultMessage() {
    return '$value is associated with existing account';
  }
}
