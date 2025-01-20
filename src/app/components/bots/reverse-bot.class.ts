import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { Bot } from './bot.interface';

export class ReverseBot implements Bot {
  user: User;
  reply(msg: string): Observable<Message> {
    const resp = msg.split('').reverse().join('');
    return of(new Message(uuidv4(), this.user, new Date(), resp));
  }

  constructor() {
    this.user = new User('2', 'reverse bot', 'reverse_bot.webp', true);
  }
}
