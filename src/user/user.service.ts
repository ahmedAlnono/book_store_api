import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from '../models/user.model';
import { Follow } from '../models/follow.model';
import { followUser } from './dto/followUser.dto';
import {
  FOLLOW_MODEL,
  USER_MODEL,
} from 'src/common/constants/system.constants';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
    @Inject(FOLLOW_MODEL)
    private follow: typeof Follow,
  ) {}
  async findAll() {
    return await this.user.findAll({
      attributes: ['name', 'id'],
    });
  }

  async delete(id: number) {
    try {
      this.user.addScope('deleted_users', function (user) {
        return user.where({ [Op.ne]: null });
      });
      await this.user.destroy({
        where: {
          id,
        },
      });
      return 'user successfully deleted';
    } catch (e) {
      throw new ForbiddenException('user not found');
    }
  }

  async followUser(User: followUser) {
    try {
      await this.follow.create({
        followerId: User.id,
        followedId: User.followed_id,
      });
    } catch (e) {
      throw new ForbiddenException('wrong user data');
    }
    return '';
  }

  async adminDelete(id: number) {
    try {
      const user = await this.user.findByPk(+id);
      if (user) {
        user.$set('deletedAt', Date.now());
        user.$set('deletedBy', 'Admin');
        await user.save();
        return 'user is updated';
      } else {
        throw new ForbiddenException('user not found');
      }
    } catch (e) {
      throw new BadRequestException('wrong user data');
    }
  }
}
