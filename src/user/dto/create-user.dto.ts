import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
