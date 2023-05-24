import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Book } from './book.model';

@Table({
  paranoid: true,
  underscored: true,
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
}
