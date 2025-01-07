import { User } from './user.model';

export class Message {
  constructor(
    public id: string,
    public user: User | undefined,
    public timestamp: Date,
    public text: string
  ) {}
}
