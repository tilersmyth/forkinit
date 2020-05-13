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
}
