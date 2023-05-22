import {
  Model,
  Table,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
})
export class Follow extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'follower_id',
  })
  followerId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'followed_id',
  })
  followedId: number;

  @DeletedAt
  @Column({ field: 'deletedAt' })
  deletedAt: Date;
}
