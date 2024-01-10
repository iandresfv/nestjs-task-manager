declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_PORT: string;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    HASH_SALT: number;
  }
}
