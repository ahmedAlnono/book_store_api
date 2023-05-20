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
    return req?.user;
  }

  @UseGuards(GlobalAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @UseGuards(GlobalAuthGuard)
  @Post('follow')
  followUser(@Body() User: followUser) {
    return this.userService.followUser(User);
  }
}
