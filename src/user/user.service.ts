import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { Follow } from './models/follow.model';
import { followUser } from './dto/followUser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('User')
    private user: typeof User,
    @Inject('Follow')
    private follow: typeof Follow,
  ) {}
  async findAll() {
    return await this.user.findAll({
      attributes: ['name', 'id'],
    });
  }

  // async findOne(id: number) {
  //   try {
  //     const user = await this.user.findByPk(id);
  //     delete user.hash;
  //     if (user.deletedAt) {
  //       throw new ForbiddenException('user is deleted');
  //     }
  //     return {
  //       email: user.email,
  //       name: user.name,
  //     };
  //   } catch (e) {
  //     throw new ForbiddenException('user not found');
  //   }
  // }
  async delete(id: number) {
    try {
      const user = await this.user.findByPk(+id);
      user.$set('deletedAt', Date.now());
      return 'user successfully deleted';
    } catch (e) {
      throw new ForbiddenException('user not found');
    }
  }

  async followUser(User: followUser) {
    try {
      await this.follow.create({
        follower_id: User.id,
        followed_id: User.followed_id,
      });
    } catch (e) {
      throw new ForbiddenException('wrong user data');
    }
    return '';
  }
}
