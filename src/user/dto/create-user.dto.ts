import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'password is too short',
  })
  @MaxLength(20, {
    message: 'password is too long',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/)
  hash: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
