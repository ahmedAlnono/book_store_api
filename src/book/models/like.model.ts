import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  DeletedAt,
} from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { Book } from './book.model';

@Table({
  deletedAt: true,
})
export class Like extends Model<Like> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_like_id',
    allowNull: true,
  })
  userLikeId: number;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    field: 'book_id',
    allowNull: true,
  })
  bookId: number;

  @DeletedAt
  @Column({ field: 'deletedAt' })
  deletedAt: Date;
}
