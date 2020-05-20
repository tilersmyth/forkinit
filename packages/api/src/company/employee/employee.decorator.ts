import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { EmployeeEntity } from './employee.entity';

export const Employee = createParamDecorator(
  (_data: unknown, context: ExecutionContext): EmployeeEntity | undefined => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().employee;
  },
);
