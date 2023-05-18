import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './models/book.model';
import { Like } from './models/like.model';
import { User } from 'src/user/models/user.model';
import * as argon from 'argon2';
import { LikeBookDto } from './dto/like-book.dto';
import { SaveBookDto } from './dto/save-book-dto';

@Injectable()
export class BookService {
  constructor(
    @Inject('Book')
    private book: typeof Book,
    @Inject('Like')
    private like: typeof Like,
    @Inject('User')
    private user: typeof User,
  ) {}
  async create(createBookDto: CreateBookDto) {
    try {
      const user = await this.user.findByPk(createBookDto.id);
      if (await argon.verify(user.hash, createBookDto.password)) {
        const data = createBookDto.data;
        const book = await this.book.create({
          name: createBookDto.name,
          data,
          public: createBookDto.public || true,
          body: createBookDto.body,
          category: createBookDto.category || 'global',
          user_id: createBookDto.id,
        });
        user.books.push(book);
        user.save();
      } else {
        throw new ForbiddenException('wrong password');
      }
    } catch (e) {
      throw new ForbiddenException('book not created');
    }
  }

  async findAll() {
    try {
      const books = await this.book.findAll({
        attributes: ['name', 'data', 'category'],
        where: {
          public: true,
        },
      });
      return books;
    } catch (e) {
      throw new ForbiddenException('unknown error');
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.book.findOne({
        where: {
          id,
        },
        attributes: ['name', 'data', 'category'],
      });
      return book;
    } catch (e) {
      throw new ForbiddenException('book not found');
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.book.findByPk(id);
    if (book) {
      await book.update({
        name: updateBookDto.name,
        body: updateBookDto.body,
        data: updateBookDto.data,
        category: updateBookDto.category || 'global',
        public: updateBookDto.public || true,
      });
    } else {
      throw new ForbiddenException('wrong password');
    }
  }

  async remove(id: number) {
    const book = await this.book.findByPk(id);
    if (book) {
      book.$set('deletedAt', Date.now());
      return 'book is deleted';
    } else {
      throw new ForbiddenException('book not found');
    }
  }

  async likeBook(likeBook: LikeBookDto) {
    try {
      const user = await this.user.findByPk(likeBook.id);
      if (await argon.verify(user.hash, likeBook.password)) {
        await this.like.create({
          user_id: likeBook.id,
          book_id: likeBook.book_id,
        });
        return 'like book success';
      } else {
        throw new ForbiddenException('wrong password');
      }
    } catch (e) {
      throw new ForbiddenException('like not work');
    }
  }

  async saveBook(saveBook: SaveBookDto) {
    try {
      const user = await this.user.findByPk(saveBook.id);
      const book = await this.book.findByPk(saveBook.book_id);
      if ((await argon.verify(user.hash, saveBook.password)) && book) {
        user.saved_book.push(book);
        await user.save();
        return 'booke saved';
      } else {
        throw new ForbiddenException('wrong data');
      }
    } catch (e) {
      throw new BadRequestException('bad request');
    }
  }

  async deleteSaveBook(saveBook: SaveBookDto) {
    try {
      const user = await this.user.findByPk(saveBook.id);
      if (user) {
        const book = await this.book.findByPk(saveBook.book_id);
        if ((await argon.verify(user.hash, saveBook.password)) && book) {
          const index = user.books.findIndex((dbook) => dbook.id === book.id);
          user.books.splice(index, 1);
          user.save();
        } else {
          throw new BadRequestException('wrong data');
        }
      } else {
        throw new ForbiddenException('user not found');
      }
    } catch (e) {
      throw new BadRequestException('wrong data');
    }
  }

  async unLikeBook(likeBook: LikeBookDto) {
    try {
      const user = await this.user.findByPk(likeBook.id);
      if (await argon.verify(user.hash, likeBook.password)) {
        await this.like.destroy({
          where: {
            book_id: likeBook.book_id,
            user_id: likeBook.id,
          },
        });
        return 'success unlike';
      } else {
        throw new ForbiddenException('wrong password');
      }
    } catch (e) {
      throw new ForbiddenException('like not work');
    }
  }
}
