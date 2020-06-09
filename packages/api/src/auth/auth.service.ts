import { Injectable } from '@nestjs/common';

import { ExpressRequest } from '../types';
import { AdminService } from '../admin/admin.service';
import { AdminEntity } from '../admin/admin.entity';

interface AuthSession {
  admin: Partial<AdminEntity> | null;
}

@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService) {}

  async validateSession(req: ExpressRequest): Promise<AuthSession> {
    // Graphql Playground IntrospectionQuery DOT NOT Validate
    if (req.body && req.body.query.includes('IntrospectionQuery')) {
      return { admin: null };
    }

    return {
      admin: await this.adminService.validateSession(req),
    };
  }
}
