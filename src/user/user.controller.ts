import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { followUser } from './dto/followUser.dto';
// import { UserGuard } from './user.guard';
import { JwtGuard } from './auth/gaurd/jwt.guard';
import { Request } from 'express';
import { GlobalAuthGuard } from './auth/gaurd/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(GlobalAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    // console.log(req['user']);
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @Post('follow')
  followUser(@Body() User: followUser) {
    return this.userService.followUser(User);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getme(@Req() req: Request) {
    return this.userService.getme(req);
  }
}
