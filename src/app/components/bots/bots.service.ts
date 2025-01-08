import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Bot } from './bot.interface';
import { EchoBot } from './echo-bot.class';
import { ReverseBot } from './reverse-bot.class';

@Injectable({
  providedIn: 'root',
})
export class BotsService {
  private bots: Map<string, Bot> = new Map<string, Bot>([
    ['1', new EchoBot()],
    ['2', new ReverseBot()],
  ]);

  reply(botId: string, msg: string): { text: string; usr: User | undefined } {
    const bot = this.bots.get(botId);
    if (bot === undefined) {
      return { text: 'error:bot not found', usr: undefined };
    }

    return { text: bot.reply(msg), usr: bot.user };
  }

  getBots(): User[] {
    return Array.from(this.bots.values()).map((bot) => bot.user);
  }

  getBot(botId: string): Bot | undefined {
    return this.bots.get(botId);
  }
}
