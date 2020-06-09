import { Response } from 'express';

import { ExpressRequest } from './request.interface';
import { AdminEntity } from '../admin/admin.entity';

export interface ExpressContext {
  req: ExpressRequest;
  res: Response;
  admin?: Partial<AdminEntity>;
}
