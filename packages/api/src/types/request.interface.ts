import { Request } from 'express';

import { CompanyEntity } from '../company/company.entity';

export interface ExpressRequest extends Request {
  session: Express.Session;
  company?: CompanyEntity;
}
