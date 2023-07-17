import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './user/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from './user/auth/gaurd/auth.guard';

@Module({
  imports: [
    UserModule,
    BookModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      ignoreEnvVars: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: GlobalAuthGuard,
    // },
  ],
})
export class AppModule {}
