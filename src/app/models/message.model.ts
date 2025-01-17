import { User } from './user.model';

export class Message {
  constructor(
    public readonly id: string,
    public user: User | undefined,
    public timestamp: Date,
    public text: string,
    public isRead = true
  ) {}
}
