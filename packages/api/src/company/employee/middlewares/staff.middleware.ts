import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

import { ExpressRequest } from '../../../types/request.interface';
import { ConfigService } from 'api/src/core/config/config.service';
import { EmployeeService } from '../employee.service';

@Injectable()
export class EmployeeStaffMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly employeeService: EmployeeService,
  ) {}

  async use(req: ExpressRequest, _res: Response, next: Function) {
    if (!req.employee || !req.company || !req.employee.admin) {
      return next();
    }

    const token = req.headers['authorization'];

    if (!token) {
      return next();
    }

    try {
      const { staffId } = jwt.verify(
        token,
        this.configService.JWT_SECRET,
      ) as any;

      if (staffId === req.employee.admin) {
        Object.assign(req.employee, { staff: req.employee.admin });
        return next();
      }

      const staff = await this.employeeService.findOneById(staffId);
      Object.assign(req.employee, { staff });
      next();
    } catch (err) {
      next();
    }
  }
}
