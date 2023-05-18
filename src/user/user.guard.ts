import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from './models/user.model';
import * as argon from 'argon2';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @Inject('User')
    private user: typeof User,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const password = await req.body.password;
    const id = await req.body.id;
    if (!id && !password) {
      return false;
    }
    const user = await this.user.findOne({
      where: {
        id,
      },
      attributes: ['hash', 'id'],
    });
    if (user && (await argon.verify(user.hash, password))) {
      return true;
    }
    return true;
  }
}
