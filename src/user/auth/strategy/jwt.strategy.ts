import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'supper-secret',
    });
  }

  async validate(payload: any) {
    // console.log(payload);
    const user = await this.authService.validateUser(
      payload.sub,
      payload.email,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
