declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'local' | 'prod' | 'test';
      readonly TZ?: string;

      readonly PROTOCOL: 'http' | 'https';
      readonly HOST: string;

      readonly REFRESH_SECRET: string;
      readonly ACCESS_SECRET: string;
      readonly HASH_ROUNDS: string;

      // DB
      readonly DB_HOST: string;
      readonly DB_PORT: string;
      readonly DB_USERNAME: string;
      readonly DB_PASSWORD: string;
      readonly DB_DATABASE: string;

      // AWS
      readonly AWS_RESION: string;
      readonly AWS_S3_ACCESS_KEY: string;
      readonly AWS_S3_SECRET_KEY: string;
      readonly AWS_S3_BUCKET_NAME: string;

      readonly GOOGLE_API_KEY: string;
      readonly GOOGLE_CLIENT_ID: string;
      readonly GOOGLE_CLIENT_SECRET: string;
      readonly KAKAO_CLIENT_ID: string;
      readonly KAKAO_CLIENT_SECRET: string;

      // LOG
      readonly DISCORD_WEBHOOK_URL: string;

      // MAIL
      readonly NAVER_USER: string;
      readonly NAVER_PASSWORD: string;

      // CHZZK
      readonly CHZZK_CLIENT_ID: string;
      readonly CHZZK_CLIENT_SECRET: string;
    }
  }
}

export {};
