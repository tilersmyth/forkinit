import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  Inject,
} from '@nestjs/common';
import session, { SessionOptions } from 'express-session';

import { sessionProvider } from './session.provider';
import { ConfigService } from '../config/config.service';
import { SESSION_MODULE_OPTIONS } from './session.constants';

@Module({
  providers: [sessionProvider, ConfigService],
})
export class SessionModule implements NestModule {
  constructor(
    @Inject(SESSION_MODULE_OPTIONS) private readonly options: SessionOptions,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(session(this.options))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
