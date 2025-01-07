import { User } from '../../models/user.model';

export interface Bot {
  user: User;
  reply: (msg: string) => string;
}
