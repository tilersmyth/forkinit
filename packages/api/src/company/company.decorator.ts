import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { CompanyEntity } from './company.entity';
import { ExpressRequest } from '../types';

export const Company = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CompanyEntity | undefined => {
    const context = GqlExecutionContext.create(ctx);
    const req: ExpressRequest = context.getContext().req;
    return req.company;
  },
);
