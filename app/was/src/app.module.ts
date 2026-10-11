import {
  BeforeApplicationShutdown,
  ClassSerializerInterceptor,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PUBLIC_FOLDER_PATH } from './common/const/path.const';
import { AwsModule } from './aws/aws.module';
import { ImageModule } from './image/image.module';
import { LogModule } from './log/log.module';
import { LogService } from './log/log.service';
import { TwosdayModule } from './twosday/twosday.module';
import { MailModule } from './mail/mail.module';
import { CustomClassSerializerInterceptor } from './common/intercepter/class-serializer.intercepter';
import { ChzzkModule } from './chzzk/chzzk.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FOLDER_PATH,
      exclude: ['/api*'],
      serveStaticOptions: {
        // false일시 server side 404 발생
        fallthrough: true,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    CommonModule,
    AwsModule,
    ImageModule,
    LogModule,
    MailModule,
    TwosdayModule,
    ChzzkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      /**
       *  직렬화 => 현재 시스템에서 사용되는 데이터구조를 다른 시스템에서 사용되는 데이터구조(JSON)로 변환하는 과정
       */
      useClass: CustomClassSerializerInterceptor,
    },
  ],
})
export class AppModule
  implements
    OnApplicationBootstrap,
    OnModuleInit,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly logService: LogService) {}

  async onModuleInit() {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'prod') {
      await this.logService.sendDiscode(`WAS 서버가 실행되었습니다.`);
    }
  }

  async onModuleDestroy() {}

  async beforeApplicationShutdown(signal?: string) {
    if (process.env.NODE_ENV === 'prod') {
      await this.logService.sendDiscode(`WAS 서버가 종료됩니다.`);
    }
  }

  async onApplicationShutdown(signal?: string) {}
}
