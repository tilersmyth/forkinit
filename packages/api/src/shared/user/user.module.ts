import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { IsUserAlreadyExist } from './user.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [IsUserAlreadyExist, UserService],
  exports: [UserService],
})
export class UserModule {}
