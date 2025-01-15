import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Bot } from './bot.interface';

export class DelayBot implements Bot {
  user: User;
  reply(msg: string): Observable<string> {
    return new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next(`reply: ${msg}`);
        observer.complete();
      }, 5000);
    });
  }

  constructor() {
    this.user = new User('3', 'delay bot', 'delay_bot.png', true);
  }
}
