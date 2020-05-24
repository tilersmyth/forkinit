import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

import { ExpressRequest } from '../../../types/request.interface';
import { EmployeeService } from '../employee.service';

@Injectable()
export class EmployeeAdminMiddleware implements NestMiddleware {
  constructor(private readonly employeeService: EmployeeService) {}

  async use(req: ExpressRequest, _res: Response, next: Function) {
    if (!req.company || !req.session.employeeId) {
      return next();
    }

    try {
      const admin = await this.employeeService.findOneById(
        req.session.employeeId,
      );
      Object.assign(req, { employee: { admin } });
    } catch (err) {
    } finally {
      next();
    }
  }
}
