import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class LikeBookDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsPositive()
  book_id: number;
}
