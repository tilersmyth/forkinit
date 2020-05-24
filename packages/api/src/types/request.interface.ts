import { Request } from 'express';

import { CompanyEntity } from '../company/company.entity';
import { IEmployeeSession } from '../company/employee/interfaces/session.interface';

export interface ExpressRequest extends Request {
  session: Express.Session;
  company?: CompanyEntity;
  employee?: IEmployeeSession;
}
