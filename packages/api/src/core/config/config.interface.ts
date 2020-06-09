import { CleanEnv } from 'envalid';

export interface IConfig extends CleanEnv {
  PROTOCOL: string;
  PORT: number;
  BASE_HOST: string;
  PUBLIC_DIR: string;
  // DB
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_SYNCHRONIZE: string;
  // REDIS
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  // SESSION
  SESSION_NAME: string;
  SESSION_SECRET: string;
  SESSION_MAX_AGE: number;
  // JWT
  JWT_SECRET: string;
  // TWILIO
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_VERIFY_SERVICE_SID: string;
}
