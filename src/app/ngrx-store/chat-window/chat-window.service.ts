import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { BotsService } from '../../components/bots/bots.service';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatWindowService {
  private messages: Message[] = [];

  constructor(private botServ: BotsService) {}

  chat(msg: Message, botId: string): Observable<Message[]> {
    // append user input message
    this.messages = [...this.messages, msg];

    // get bot response
    const { text, usr } = this.botServ.reply(botId, msg.text);
    const response = new Message(uuidv4(), usr, new Date(), text);

    // put bot message
    this.messages = [...this.messages, response];

    return of(this.messages);
  }
}
