import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ExpressRequest } from '../../types';
import { IEmployeeSession } from './interfaces/session.interface';

export const EmployeeSession = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IEmployeeSession | undefined => {
    const context = GqlExecutionContext.create(ctx);
    const req: ExpressRequest = context.getContext().req;
    return req.employee;
  },
);
