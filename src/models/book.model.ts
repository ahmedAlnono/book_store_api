import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  DeletedAt,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Like } from './like.model';

const { INTEGER } = DataType;

@Table({
  deletedAt: true,
  paranoid: true,
  underscored: true,
})
export class Book extends Model<Book> {
  @Column
  name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  public: boolean;

  @Column({
    type: DataType.TEXT,
  })
  body: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'general',
  })
  category: string;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @Column({ field: 'deleted_by', type: DataType.STRING, allowNull: true })
  deletedBy: string;

  @Column({ field: 'updated_by' })
  updatedBy: string;

  @ForeignKey(() => User)
  @Column(INTEGER)
  userId: number;

  @HasMany(() => Like)
  likes: Like[];
}
