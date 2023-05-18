import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class FindeUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
