import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({}), UserModule],
  providers: [AuthService, GoogleStrategy, KakaoStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
