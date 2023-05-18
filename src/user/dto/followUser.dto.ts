import { IsNotEmpty, IsNumber } from 'class-validator';

export class followUser {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  followed_id: number;
}
