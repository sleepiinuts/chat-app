import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BotsService } from '../../components/bots/bots.service';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatWindowService {
  private messages: Message[] = [];

  constructor(private botServ: BotsService) {}

  chat(msg: Message, botId: string): Observable<Message[]> {
    this.messages = [...this.messages, msg];

    // get bot response
    const response: Message = Object.assign({}, msg);
    response.text = this.botServ.reply(botId, msg.text);
    // response.user.isBot = true;

    // put bot message
    this.messages = [...this.messages, response];

    return of(this.messages);
  }
}
