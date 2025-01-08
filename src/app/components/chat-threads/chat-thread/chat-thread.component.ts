import { Component, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Thread } from '../../../models/thread.model';
import { ChatThreadsActions } from '../../../ngrx-store/chat-threads/chat-threads.actions';

@Component({
  selector: 'app-chat-thread',
  imports: [],
  templateUrl: './chat-thread.component.html',
  styleUrl: './chat-thread.component.scss',
})
export class ChatThreadComponent {
  thread = input.required<Thread>();

  constructor(private store: Store) {}

  setCurrentThread() {
    this.store.dispatch(
      ChatThreadsActions.setCurrentThread({
        currentThread: this.thread().bot.id,
      })
    );
  }
}
