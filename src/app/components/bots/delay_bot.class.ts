import { User } from '../../models/user.model';
import { Bot } from './bot.interface';

export class DelayBot implements Bot {
  user: User;
  reply(msg: string): string {
    return msg;
  }

  constructor() {
    this.user = new User('3', 'delay bot', 'delay_bot.png', true);
  }
}
