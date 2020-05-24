import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule } from './config/config.module';
import { TypeormService } from './typeorm/typeorm.service';
import { GraphqlService } from './graphql/graphql.service';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    RedisModule,
    SessionModule,
  ],
})
export class CoreModule {}
