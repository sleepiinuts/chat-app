import { User } from '../../models/user.model';

export interface Bot {
  readonly user: User;
  reply: (msg: string) => string;
}
