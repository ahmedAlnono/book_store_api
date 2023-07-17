import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  Res,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { followUser } from './dto/followUser.dto';
import { Request, Response } from 'express';
import { Public } from './public.decorator';

// @UseGuards(GlobalAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
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
  @Post('cookies')
  getCockies(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', 'ahmed');
    return req.cookies;
  }
}
