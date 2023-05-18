import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface data {
  sections: number;
  pages: number;
  price: string;
  version: number;
}

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  data: data;

  public?: boolean;

  category?: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
