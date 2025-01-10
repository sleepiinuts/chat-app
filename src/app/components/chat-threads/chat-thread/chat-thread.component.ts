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

  selectThread() {
    this.store.dispatch(
      ChatThreadsActions.switchThread({
        threadId: this.thread().bot.id,
      })
    );
  }
}
