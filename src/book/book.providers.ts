import { Book } from '../models/book.model';
import { Like } from '../models/like.model';

export const BookProviders = [
  {
    provide: 'BOOK_MODEL',
    useValue: Book,
  },
  {
    provide: 'LIKE_MODEL',
    useValue: Like,
  },
];
