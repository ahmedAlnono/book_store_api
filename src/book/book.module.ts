import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookProviders } from './models/book.providers';
import { userProviders } from 'src/user/models/user.providers';

@Module({
  controllers: [BookController],
  providers: [BookService, ...BookProviders, ...userProviders],
})
export class BookModule {}
