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

  private validate(dotEnvPath: string): IConfig {
    const rule = {
      PROTOCOL: envalid.str({ choices: ['http', 'https'], default: 'http' }),
      PORT: envalid.port(),
      BASE_HOST: envalid.str(),
      PUBLIC_DIR: envalid.str(),
    };

    return envalid.cleanEnv(process.env, rule, { dotEnvPath });
  }
}
