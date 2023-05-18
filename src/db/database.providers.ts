import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { Book } from 'src/book/models/book.model';
import { Follow } from 'src/user/models/follow.model';
import { Like } from 'src/book/models/like.model';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
      });
      sequelize.addModels([User, Book, Follow, Like]);
      return sequelize;
    },
  },
];
