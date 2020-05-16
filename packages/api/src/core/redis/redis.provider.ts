import Redis from 'ioredis';

import {
  REDIS_CLIENT,
  REDIS_MODULE_OPTIONS,
  REDIS_SESSION_CLIENT,
} from './redis.constants';
import { Provider } from '@nestjs/common';
import { RedisModuleOptions, IRedisClient } from './redis.interface';
import { ConfigService } from '../config/config.service';

export class RedisClientError extends Error {}

async function getClient(options: RedisModuleOptions): Promise<Redis.Redis> {
  const { onClientReady, ...opt } = options;
  const client = new Redis(opt);
  if (onClientReady) {
    onClientReady(client);
  }
  return client;
}

export const redisProvider = (): Provider[] => [
  {
    provide: REDIS_MODULE_OPTIONS,
    useFactory: (configService: ConfigService): RedisModuleOptions[] => [
      {
        name: REDIS_SESSION_CLIENT,
        host: configService.REDIS_HOST,
        port: configService.REDIS_PORT,
        password: configService.REDIS_PASSWORD,
      },
    ],
    inject: [ConfigService],
  },
  {
    provide: REDIS_CLIENT,
    useFactory: async (
      options: RedisModuleOptions[],
    ): Promise<IRedisClient> => {
      const clients = new Map<string, Redis.Redis>();

      await Promise.all(
        options.map(async o => {
          if (clients.has(o.name)) {
            throw new RedisClientError(`${o.name} client already exists`);
          }
          clients.set(o.name, await getClient(o));
        }),
      );

      return { clients };
    },
    inject: [REDIS_MODULE_OPTIONS],
  },
];
