import { Injectable } from '@angular/core';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { mergeMap, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { selectCurrentThreadId } from '../../ngrx-store/all.selector';
import { Bot } from './bot.interface';
import { DelayBot } from './delay_bot.class';
import { EchoBot } from './echo-bot.class';
import { ReverseBot } from './reverse-bot.class';

@Injectable({
  providedIn: 'root',
})
export class BotsService {
  private bots: Map<string, Bot> = new Map<string, Bot>([
    ['1', new EchoBot()],
    ['2', new ReverseBot()],
    ['3', new DelayBot()],
  ]);

  constructor(private store: Store) {}

  reply(botId: string, msg: string): Observable<Message> {
    const bot = this.bots.get(botId);

    // console.log(`botId : ${botId}`);

    if (bot === undefined) {
      return of(
        new Message(uuidv4(), undefined, new Date(), 'error:bot not found')
      );
    } else {
      // mark read if at the moment of bot response, user currently at the same thread
      return bot.reply(msg).pipe(
        concatLatestFrom(() => this.store.select(selectCurrentThreadId)),
        mergeMap(([msg, threadId]) => {
          msg.isRead = threadId === bot.user.id;
          return of(msg);
        })
      );
    }
  }

  getBots(): User[] {
    return Array.from(this.bots.values()).map((bot) => bot.user);
  }

  getBot(botId: string): Bot | undefined {
    return this.bots.get(botId);
  }
}
