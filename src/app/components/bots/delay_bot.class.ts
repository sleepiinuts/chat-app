import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { Bot } from './bot.interface';

export class DelayBot implements Bot {
  user: User;
  reply(msg: string): Observable<Message> {
    return new Observable<Message>((observer) => {
      setTimeout(() => {
        const resp = new Message(
          uuidv4(),
          this.user,
          new Date(),
          `reply: ${msg}`
        );
        observer.next(resp);
        observer.complete();
      }, 5000);
    });
  }

  constructor() {
    this.user = new User('3', 'delay bot', 'delay_bot.png', true);
  }
}
