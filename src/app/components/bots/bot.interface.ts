import { Observable } from 'rxjs';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

export interface Bot {
  readonly user: User;
  reply: (msg: string) => Observable<Message>;
}
