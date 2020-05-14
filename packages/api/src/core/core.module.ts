import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule } from './config/config.module';
import { TypeormService } from './typeorm/typeorm.service';
import { GraphqlService } from './graphql/graphql.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
  ],
})
export class CoreModule {}
