declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      JWT_SECRET: string;
      DATABASE_URL: string;
      ORIGIN_ALLOWED: string;
      NODE_VERSION: string;
    }
  }
}

export {};
