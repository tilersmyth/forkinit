import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';

import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminCreateInput } from './inputs/create.input';
import { AdminVefiySmsInput } from './inputs/verify-sms.input';
import { AdminLoginInput } from './inputs/login.input';
import { ExpressContext } from '../types';

@Resolver(() => AdminEntity)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => AdminEntity)
  async adminCreate(@Args('input') input: AdminCreateInput) {
    return this.adminService.createAdmin(input);
  }

  @Mutation(() => AdminEntity)
  async adminCreateVerify(@Args('input') input: AdminVefiySmsInput) {
    return this.adminService.createAdminVerify(input);
  }

  @Mutation(() => AdminEntity)
  async adminLogin(@Args('input') input: AdminLoginInput) {
    return this.adminService.login(input);
  }

  @Mutation(() => AdminEntity)
  async adminVerfiyLogin(
    @Args('input') input: AdminVefiySmsInput,
    @Context() ctx: ExpressContext,
  ) {
    return this.adminService.loginVerify(input, ctx.req);
  }
}
