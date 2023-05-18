import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaveBookDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNumber()
  book_id: number;
}
