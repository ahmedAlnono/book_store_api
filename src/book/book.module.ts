import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookProviders } from './book.providers';
import { userProviders } from 'src/user/user.providers';

@Module({
  controllers: [BookController],
  providers: [BookService, ...BookProviders, ...userProviders],
})
export class BookModule {}
