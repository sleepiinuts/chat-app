import { Bot } from './bot.interface';

export class ReverseBot implements Bot {
  reply(msg: string): string {
    return msg.split('').reverse().join('');
  }
}
