import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Thread } from '../../models/thread.model';
import { User } from '../../models/user.model';
import { BotsService } from '../bots/bots.service';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';

@Component({
  selector: 'app-chat-threads',
  imports: [ChatThreadComponent, KeyValuePipe],
  templateUrl: './chat-threads.component.html',
  styleUrl: './chat-threads.component.scss',
})
export class ChatThreadsComponent {
  users: User[];
  threads = new Map<string, Thread>();

  constructor(private botServ: BotsService) {
    this.users = this.botServ.getBots();

    // initial threads map; 1 thread: 1 bot
    this.users.forEach((u) => {
      this.threads.set(u.id, new Thread(u, undefined, undefined));
    });
  }
}
