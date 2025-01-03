import { Component } from '@angular/core';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';

@Component({
  selector: 'app-chat-threads',
  imports: [ChatThreadComponent],
  templateUrl: './chat-threads.component.html',
  styleUrl: './chat-threads.component.scss',
})
export class ChatThreadsComponent {}
