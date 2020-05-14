import { Resolver, Query } from '@nestjs/graphql';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  async allUsers(): Promise<UserEntity[]> {
    return this.userService.find();
  }
}
