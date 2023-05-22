import { Follow } from '../models/follow.model';
import { User } from '../models/user.model';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useValue: User,
  },
  {
    provide: 'FOLLOW_MODEL',
    useValue: Follow,
  },
];
