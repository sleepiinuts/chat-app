import { Injectable } from '@angular/core';
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

  reply(botId: string, msg: string): string {
    return this.bots.get(botId)?.reply(msg) || 'error: bot not found';
  }
}
