import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  DeletedAt,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { Like } from './like.model';

@Table({
  deletedAt: true,
})
export class Book extends Model<Book> {
  @Column
  name: string;

  @Column({
    type: DataType.JSON,
  })
  data: {
    sections: number;
    pages: number;
    price: string;
    version: number;
  };

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

  @Column({ field: 'deleted_by' })
  deletedBy: string;

  @Column({ field: 'updated_by' })
  updatedBy: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @HasMany(() => Like)
  likes: Like[];
}
