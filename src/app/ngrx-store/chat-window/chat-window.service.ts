import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BotsService } from '../../components/bots/bots.service';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatWindowService {
  constructor(private botServ: BotsService) {}

  chat(msg: Message, botId: string): Observable<Message> {
    // get bot response
    return this.botServ.reply(botId, msg.text);

    // return text.pipe(
    //   map((txt) => {
    //     return new Message(uuidv4(), usr, new Date(), txt);
    //   })
    // );
  }
}
