import { AfterViewInit, Component, input, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from '../../../models/message.model';
import { Thread } from '../../../models/thread.model';
import { selectLatestMsgFromThread } from '../../../ngrx-store/all.selector';
import { ChatThreadsActions } from '../../../ngrx-store/chat-threads/chat-threads.actions';

@Component({
  selector: 'app-chat-thread',
  imports: [],
  templateUrl: './chat-thread.component.html',
  styleUrl: './chat-thread.component.scss',
})
export class ChatThreadComponent implements AfterViewInit {
  thread = input.required<Thread>();

  // signal
  latestMsg: Signal<Message | undefined> = signal(undefined);

  constructor(private store: Store) {}
  ngAfterViewInit(): void {
    const threadId = this.thread().bot.id;

    this.latestMsg = this.store.selectSignal(
      selectLatestMsgFromThread(threadId)
    );
  }

  // ngAfterViewInit(): void {

  // }

  selectThread() {
    this.store.dispatch(
      ChatThreadsActions.switchThread({
        threadId: this.thread().bot.id,
      })
    );
  }
}
