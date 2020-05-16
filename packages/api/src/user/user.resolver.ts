import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserRegisterInput } from './inputs/register.input';
import { UserLoginInput } from './inputs/login.input';
import { ExpressContext } from '../types';
import { Me } from './user.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  async allUsers(): Promise<UserEntity[]> {
    return this.userService.find();
  }

  @Query(() => UserEntity, { nullable: true })
  async me(@Me() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Mutation(() => UserEntity)
  async register(@Args('input') input: UserRegisterInput) {
    return this.userService.register(input);
  }

  @Mutation(() => UserEntity)
  async login(
    @Args('input') input: UserLoginInput,
    @Context() ctx: ExpressContext,
  ) {
    return this.userService.login(input, ctx.req);
  }
}
