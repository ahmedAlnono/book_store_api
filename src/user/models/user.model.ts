import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  IsEmail,
  Unique,
  DeletedAt,
} from 'sequelize-typescript';
import { Book } from 'src/book/models/book.model';
import { Follow } from './follow.model';
import { Like } from 'src/book/models/like.model';

@Table({
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
})
export class User extends Model {
  @Column
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hash: string;

  @HasMany(() => Book)
  likes: Book[];

  @HasMany(() => Book)
  books: Book[];

  @HasMany(() => Book)
  saved_book: Book[];

  @HasMany(() => Book)
  shopping: Book[];

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @HasMany(() => Follow)
  followers: Follow[];

  @HasMany(() => Like)
  good_rates: Like[];
}
