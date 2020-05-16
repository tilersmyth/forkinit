import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';
import { RedisClientError } from './redis.provider';
import { IRedisClient } from './redis.interface';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: IRedisClient,
  ) {}

  getClient(name: string): Redis {
    const client = this.redisClient.clients.get(name);

    if (!client) {
      throw new RedisClientError(`client ${name} does not exist`);
    }

    return client;
  }
}
