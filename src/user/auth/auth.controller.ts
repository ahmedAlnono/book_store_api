import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FindeUserDto } from 'src/user/dto/find-user.dto';
import { Request } from 'express';
// import { JwtGuard } from './gaurd/jwt.guard';
import { GlobalAuthGuard } from './gaurd/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signin(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: FindeUserDto) {
    return this.authService.signin(signInDto);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(GlobalAuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return req.user;
  }

  // @Post('signin')
  // signup(@Body() user: FindeUserDto) {
  //   return this.authService.signin(user);
  // }
}
