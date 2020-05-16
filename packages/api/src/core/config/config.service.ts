import envalid from 'envalid';

import { IConfig } from './config.interface';

export class ConfigService {
  private readonly envConfig: IConfig;

  constructor(dotEnvPath: string) {
    this.envConfig = this.validate(dotEnvPath);
  }

  get PROTOCOL(): string {
    return this.envConfig.PROTOCOL;
  }

  get PORT(): number {
    return Number(this.envConfig.PORT);
  }

  get BASE_HOST(): string {
    return this.envConfig.BASE_HOST;
  }

  get PUBLIC_DIR(): string {
    return this.envConfig.PUBLIC_DIR;
  }

  // DB

  get DB_HOST(): string {
    return this.envConfig.DB_HOST;
  }

  get DB_PORT(): number {
    return Number(this.envConfig.DB_PORT);
  }

  get DB_USER(): string {
    return this.envConfig.DB_USER;
  }

  get DB_PASSWORD(): string {
    return this.envConfig.DB_PASSWORD;
  }

  get DB_DATABASE(): string {
    return this.envConfig.DB_DATABASE;
  }

  get DB_SYNCHRONIZE(): boolean {
    return typeof this.envConfig.DB_SYNCHRONIZE !== 'undefined'
      ? Boolean(this.envConfig.DB_SYNCHRONIZE === 'true')
      : true;
  }

  // REDIS

  get REDIS_HOST(): string {
    return this.envConfig.REDIS_HOST;
  }

  get REDIS_PORT(): number {
    return Number(this.envConfig.REDIS_PORT);
  }

  get REDIS_PASSWORD(): string {
    return this.envConfig.REDIS_PASSWORD;
  }

  // SESSION

  get SESSION_NAME(): string {
    return this.envConfig.SESSION_NAME;
  }

  get SESSION_SECRET(): string {
    return this.envConfig.SESSION_SECRET;
  }

  get SESSION_MAX_AGE(): number {
    return Number(this.envConfig.SESSION_MAX_AGE);
  }

  // ENV (envalid defaults)

  get isProduction(): boolean {
    return this.envConfig.isProduction;
  }

  get isDev(): boolean {
    return this.envConfig.isDev;
  }

  get isTest(): boolean {
    return this.envConfig.isTest;
  }

  private validate(dotEnvPath: string): IConfig {
    const rule = {
      PROTOCOL: envalid.str({ choices: ['http', 'https'], default: 'http' }),
      PORT: envalid.port(),
      BASE_HOST: envalid.str(),
      PUBLIC_DIR: envalid.str(),
      // DB
      DB_HOST: envalid.str(),
      DB_PORT: envalid.num(),
      DB_USER: envalid.str(),
      DB_PASSWORD: envalid.str(),
      DB_DATABASE: envalid.str(),
      DB_SYNCHRONIZE: envalid.str(),
      // REDIS
      REDIS_HOST: envalid.str(),
      REDIS_PORT: envalid.num(),
      REDIS_PASSWORD: envalid.str(),
      // SESSION
      SESSION_NAME: envalid.str(),
      SESSION_SECRET: envalid.str(),
      SESSION_MAX_AGE: envalid.num(),
    };

    return envalid.cleanEnv(process.env, rule, { dotEnvPath });
  }
}