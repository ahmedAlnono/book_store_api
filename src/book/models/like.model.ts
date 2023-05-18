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
  user_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_like_id',
    allowNull: true,
  })
  user_like_id: number;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    field: 'book_id',
    allowNull: true,
  })
  book_id: number;

  @DeletedAt
  @Column({ field: 'deletedAt' })
  deletedAt: Date;
}
