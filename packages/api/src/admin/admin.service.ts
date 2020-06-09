import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-core';
import twilio from 'twilio';
import { compareSync } from 'bcryptjs';

import { CrudService } from '../base/crud.service';
import { AdminEntity } from './admin.entity';
import { AdminCreateInput } from './inputs/create.input';
import { ConfigService } from '../core/config/config.service';
import { AdminVefiySmsInput } from './inputs/verify-sms.input';
import { AdminLoginInput } from './inputs/login.input';
import { ExpressRequest } from '../types';

@Injectable()
export class AdminService extends CrudService<AdminEntity> {
  constructor(
    @InjectRepository(AdminEntity)
    protected readonly repository: Repository<AdminEntity>,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async validateSession(
    req: ExpressRequest,
  ): Promise<Partial<AdminEntity> | null> {
    if (!req.session.adminId) {
      return null;
    }

    try {
      return this.findOneById(req.session.adminId);
    } catch (error) {
      return null;
    }
  }

  // to do: put this in provider if used by other modules
  private twilioClient = twilio(
    this.configService.TWILIO_ACCOUNT_SID,
    this.configService.TWILIO_AUTH_TOKEN,
  );

  // Format for Twilio to accept
  private static twilioPhone = (phone: string) =>
    `+1${phone.replace(/-/g, '')}`;

  private async verifySms(phone: string, code: string) {
    const to = AdminService.twilioPhone(phone);

    try {
      const verify = await this.twilioClient.verify
        .services(this.configService.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks.create({ to, code });

      if (verify.status !== 'approved') {
        throw Error('Admin sms verification failed');
      }

      return verify;
    } catch (err) {
      throw err;
    }
  }

  private sendSms(phone: string) {
    const to = AdminService.twilioPhone(phone);

    return this.twilioClient.verify
      .services(this.configService.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to, channel: 'sms' });
  }

  public async createAdmin(input: AdminCreateInput): Promise<AdminEntity> {
    try {
      const admin = await this.save(input);
      await this.sendSms(admin.phone);
      return admin;
    } catch (err) {
      throw new ApolloError('validation', '', err);
    }
  }

  public async createAdminVerify(
    input: AdminVefiySmsInput,
  ): Promise<AdminEntity> {
    try {
      const admin = await this.findOne({ where: { email: input.email } });

      if (!admin) {
        throw Error('Admin account not found');
      }

      await this.verifySms(admin.phone, input.code);

      admin.active = true;
      return admin.save();
    } catch (err) {
      throw new ApolloError('validation', '', err);
    }
  }

  public async login(input: AdminLoginInput): Promise<AdminEntity> {
    try {
      const admin = await this.findOne({ where: { email: input.email } });

      if (!admin || !compareSync(input.password, admin.password)) {
        throw new ApolloError('validation', '', {
          form: 'Invalid email or password',
        });
      }

      if (!admin.active) {
        throw new Error('admin account not verified');
      }

      await this.sendSms(admin.phone);
      return admin;
    } catch (err) {
      throw new ApolloError('validation', '', err);
    }
  }

  public async loginVerify(
    input: AdminVefiySmsInput,
    req: ExpressRequest,
  ): Promise<AdminEntity> {
    try {
      const admin = await this.findOne({ where: { email: input.email } });

      if (!admin) {
        throw Error('Admin account not found');
      }

      await this.verifySms(admin.phone, input.code);

      req.session.adminId = admin.id;
      req.session.cookie.maxAge = 900000; // 15 minutes

      return admin;
    } catch (err) {
      throw new ApolloError('validation', '', err);
    }
  }
}
