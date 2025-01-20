import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { Bot } from './bot.interface';

export class EchoBot implements Bot {
  user: User;
  reply(msg: string): Observable<Message> {
    return of(new Message(uuidv4(), this.user, new Date(), msg));
  }

  constructor() {
    this.user = new User('1', 'echo bot', 'echo_bot.webp', true);
  }
}
