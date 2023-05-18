import { Follow } from './follow.model';
import { User } from './user.model';

export const userProviders = [
  {
    provide: 'User',
    useValue: User,
  },
  {
    provide: 'Follow',
    useValue: Follow,
  },
];
