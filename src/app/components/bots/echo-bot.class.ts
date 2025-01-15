import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { Bot } from './bot.interface';

export class EchoBot implements Bot {
  user: User;
  reply(msg: string): Observable<string> {
    return of(msg);
  }

  constructor() {
    this.user = new User('1', 'echo bot', 'echo_bot.webp', true);
  }
}
