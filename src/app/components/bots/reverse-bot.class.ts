import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { Bot } from './bot.interface';

export class ReverseBot implements Bot {
  user: User;
  reply(msg: string): Observable<string> {
    return of(msg.split('').reverse().join(''));
  }

  constructor() {
    this.user = new User('2', 'reverse bot', 'reverse_bot.webp', true);
  }
}
