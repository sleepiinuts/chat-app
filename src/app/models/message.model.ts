import { User } from './user.model';

export interface Message {
  id: string;
  user: User;
  timestamp: Date;
  text: string;
}
