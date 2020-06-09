import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { ConfigService } from '../config/config.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      introspection: true,
      cors: {
        origin: true,
        credentials: true,
      },
      playground: this.config.isDev,
      tracing: this.config.isDev,
      debug: this.config.isDev,
      autoSchemaFile: 'schema.gql',
      definitions: {
        outputAs: 'class',
      },
      context: async ({ req, ...ctx }) => {
        return {
          ...ctx,
          ...(await this.authService.validateSession(req)),
          req,
        };
      },
    };
  }
}
