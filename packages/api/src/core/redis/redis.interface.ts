import { Redis, RedisOptions } from 'ioredis';

export interface RedisModuleOptions extends RedisOptions {
  name: string;
  onClientReady?(client: Redis): Promise<void>;
}

export interface IRedisClient {
  clients: Map<string, Redis>;
}
