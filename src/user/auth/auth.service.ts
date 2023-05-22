import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/models/user.model';
import * as argon from 'argon2';
import { FindeUserDto } from 'src/user/dto/find-user.dto';
import { USER_MODEL } from 'src/common/constants/system.constants';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  async signin(user: FindeUserDto) {
    const findeUser = await this.user.findByPk(user.id);
    if (findeUser) {
      if (argon.verify(findeUser.hash, user.password)) {
        return this.signToken(findeUser.id, findeUser.email, user.password);
      } else {
        throw new ForbiddenException('wrong password');
      }
    } else {
      throw new ForbiddenException('user not found');
    }
  }
  async signup(user: CreateUserDto) {
    try {
      const hash = await argon.hash(user.hash);
      const create_user = await this.user.create({
        name: user.name,
        email: user.email,
        hash,
      });
      delete create_user.hash;
      return create_user;
    } catch (e) {
      throw new ForbiddenException('wrong user data');
    }
  }
  async signToken(
    userId: number,
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      password,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: this.configService.get('AUTH_SECRET'),
    });
    return {
      access_token: token,
    };
  }
  async validateUser(sub: number, email: string, password): Promise<any> {
    const user = await this.user.findOne({
      where: {
        id: sub,
      },
    });
    if (user && (await argon.verify(user.hash, password))) {
      return user;
    }
    return false;
  }
}
