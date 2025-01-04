import { Message } from './message.model';

export interface Thread {
  id: string;
  botId: string;
  latestMessage: Message;
  message: Message[];
}
