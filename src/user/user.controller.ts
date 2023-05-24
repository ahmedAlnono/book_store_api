import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { followUser } from './dto/followUser.dto';
import { Request } from 'express';
import { GlobalAuthGuard } from './auth/gaurd/auth.guard';

@UseGuards(GlobalAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SetMetadata('noAuth', true)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Req() req: Request) {
    return req?.user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @Post('follow')
  followUser(@Body() User: followUser) {
    return this.userService.followUser(User);
  }

  @Delete(':id')
  deleteUserByAdmin(
    @Req() req: Request,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    const user = req['user'];
    if (user['sub'] == id) {
      return this.userService.delete(+id);
    } else {
      return this.userService.adminDelete(+id);
    }
  }
}
