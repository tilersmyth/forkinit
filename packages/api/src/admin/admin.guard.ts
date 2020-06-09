import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExpressContext } from '../types';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: ExpressContext = GqlExecutionContext.create(
      context,
    ).getContext();

    if (ctx.admin) {
      return true;
    }

    return false;
  }
}
