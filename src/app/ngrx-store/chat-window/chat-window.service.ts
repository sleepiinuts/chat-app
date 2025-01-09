import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { BotsService } from '../../components/bots/bots.service';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatWindowService {
  constructor(private botServ: BotsService) {}

  chat(msg: Message, botId: string): Observable<Message[]> {
    // get bot response
    const { text, usr } = this.botServ.reply(botId, msg.text);
    const response = new Message(uuidv4(), usr, new Date(), text);

    // return both prompt & response message in order
    return of([msg, response]);
  }
}
