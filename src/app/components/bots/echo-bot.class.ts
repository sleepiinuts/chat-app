import { Bot } from './bot.interface';

export class EchoBot implements Bot {
  reply(msg: string): string {
    return msg;
  }
}
