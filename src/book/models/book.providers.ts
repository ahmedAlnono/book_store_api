import { Book } from './book.model';
import { Like } from './like.model';

export const BookProviders = [
  {
    provide: 'Book',
    useValue: Book,
  },
  {
    provide: 'Like',
    useValue: Like,
  },
];
