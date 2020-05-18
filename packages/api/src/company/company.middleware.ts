import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

import { CompanyService } from './company.service';
import { ExpressRequest } from '../types/request.interface';

@Injectable()
export class CompanyMiddleware implements NestMiddleware {
  constructor(private readonly companyService: CompanyService) {}

  async use(req: ExpressRequest, _res: Response, next: Function) {
    if (!req.headers.c_id) {
      return next();
    }

    try {
      const company = await this.companyService.findOneById(
        req.headers.c_id as string,
      );

      req.company = company;
    } catch (err) {
    } finally {
      next();
    }
  }
}
