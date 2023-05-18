import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `this is book store api you can 
    read the documentation from 
    https://github.com/ahmedAlnono/bookapi`;
  }
}
