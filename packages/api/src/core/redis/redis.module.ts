import { Module, OnModuleDestroy, Inject, Global } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { RedisService } from './redis.service';
import { redisProvider } from './redis.provider';
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisModuleOptions, IRedisClient } from './redis.interface';

@Global()
@Module({
  providers: [RedisService, ...redisProvider()],
  exports: [RedisService],
})
export class RedisModule implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_MODULE_OPTIONS)
    private readonly options: RedisModuleOptions[],
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleDestroy() {
    const closeConnection = ({ clients }: IRedisClient) => (
      options: RedisModuleOptions,
    ) => {
      const client = clients.get(options.name);

      if (client && !options.keepAlive) {
        client.disconnect();
      }
    };

    const redisClient = this.moduleRef.get<IRedisClient>(REDIS_CLIENT);
    const closeClientConnection = closeConnection(redisClient);
    this.options.forEach(closeClientConnection);
  }
}
