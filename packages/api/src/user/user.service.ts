import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {}

  public async findOne(
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity | null> {
    try {
      const result = await this.repository.findOneOrFail(options);
      return result;
    } catch (err) {
      return null;
    }
  }

  public async find(): Promise<UserEntity[]> {
    return this.repository.find();
  }
}
