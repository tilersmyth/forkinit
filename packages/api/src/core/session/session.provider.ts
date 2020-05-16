import { Provider } from '@nestjs/common';
import session, { SessionOptions } from 'express-session';
import Store from 'connect-redis';

import { SESSION_MODULE_OPTIONS } from './session.constants';
import { ConfigService } from '../config/config.service';
import { RedisService } from '../redis/redis.service';
import { REDIS_SESSION_CLIENT } from '../redis/redis.constants';

export const sessionProvider: Provider = {
  provide: SESSION_MODULE_OPTIONS,
  useFactory: (
    configService: ConfigService,
    redisService: RedisService,
  ): SessionOptions => {
    const RedisStore = Store(session);
    const store = new RedisStore({
      client: redisService.getClient(REDIS_SESSION_CLIENT),
    });

    return {
      store,
      name: configService.SESSION_NAME,
      secret: configService.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: configService.isProduction,
        maxAge: configService.SESSION_MAX_AGE,
      },
    };
  },
  inject: [ConfigService, RedisService],
};
