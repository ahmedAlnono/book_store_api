import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  IsEmail,
  Unique,
  DeletedAt,
  Scopes,
} from 'sequelize-typescript';
import { Book } from './book.model';
import { Follow } from './follow.model';
import { Like } from './like.model';
import { Op } from 'sequelize/types/operators';

@Scopes(() => ({
  deleted: {
    where: {
      deletedAt: {
        [Op.ne]: null, // not equal to null
      },
    },
  },
}))
@Table({
  paranoid: true,
  underscored: true,
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
  savedBook: Book[];

  @HasMany(() => Book)
  shopping: Book[];

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @Column({ field: 'deleted_by', type: DataType.STRING, allowNull: true })
  deletedBy: string;

  @HasMany(() => Follow)
  followers: Follow[];

  @HasMany(() => Like)
  good_rates: Like[];
}
