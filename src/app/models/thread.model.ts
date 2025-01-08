import { Message } from './message.model';
import { User } from './user.model';

export class Thread {
  // id: string;

  constructor(
    public readonly bot: User,
    public latestMessage: Message | undefined,
    public message: Message[] | undefined
  ) {}
}
