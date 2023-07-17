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
  BOOK_MODEL,
  FOLLOW_MODEL,
  USER_MODEL,
} from 'src/common/constants/system.constants';
import { Book } from 'src/models/book.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
    @Inject(FOLLOW_MODEL)
    private follow: typeof Follow,
    @Inject(BOOK_MODEL)
    private book: typeof Book,
  ) {}
  async findAll() {
    return await this.user.findAll({
      limit: 20,
      order: Sequelize.literal('rand()'),
    });
  }

  async delete(id: number) {
    try {
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
      await this.user.destroy({ where: { id } });
    } catch (e) {
      throw new BadRequestException('wrong user data');
    }
  }
}
