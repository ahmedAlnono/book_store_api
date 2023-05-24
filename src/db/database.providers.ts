import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/models/user.model';
import { Book } from 'src/models/book.model';
import { Follow } from 'src/models/follow.model';
import { Like } from 'src/models/like.model';

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
      // sequelize.sync();
      return sequelize;
    },
  },
];
