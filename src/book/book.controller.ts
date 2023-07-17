import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { LikeBookDto } from './dto/like-book.dto';
import { SaveBookDto } from './dto/save-book-dto';
import { Public } from 'src/user/public.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }

  @Post('like')
  like(@Body() like: LikeBookDto) {
    return this.bookService.likeBook(like);
  }

  @Post('unlike')
  unlike(@Body() like: LikeBookDto) {
    return this.bookService.unLikeBook(like);
  }

  @Post('save')
  save(@Body() saveBook: SaveBookDto) {
    return this.bookService.saveBook(saveBook);
  }

  @Delete('delete-save')
  deleteSaveBook(@Body() saveBook: SaveBookDto) {
    return this.bookService.deleteSaveBook(saveBook);
  }
}
