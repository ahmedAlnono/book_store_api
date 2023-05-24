import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
  paranoid: true,
  underscored: true,
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
}
