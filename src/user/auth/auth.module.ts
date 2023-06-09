import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import { userProviders } from '../user.providers';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'supper-secret',
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
