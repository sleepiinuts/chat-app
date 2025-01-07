import { User } from '../../models/user.model';
import { Bot } from './bot.interface';

export class ReverseBot implements Bot {
  user: User;
  reply(msg: string): string {
    return msg.split('').reverse().join('');
  }

  constructor() {
    this.user = new User('2', 'reverse bot', 'reverse_bot.webp', true);
  }
}
