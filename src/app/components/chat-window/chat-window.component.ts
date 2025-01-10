import { TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  Injector,
  Signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import {
  selectCurrentThreadId,
  selectPrompt,
  selectResponse,
  selectThreadMessages,
} from '../../ngrx-store/all.selector';
import { ChatThreadsActions } from '../../ngrx-store/chat-threads/chat-threads.actions';
import { ChatWindowActions } from '../../ngrx-store/chat-window/chat-window.actions';
import { BotsService } from '../bots/bots.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-chat-window',
  imports: [
    MatIconModule,
    MessageComponent,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent implements AfterViewInit {
  textForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  // signals
  #promptMessage: Signal<Message | undefined>;
  #responseMessage: Signal<Message | undefined>;

  botName: Signal<string> = computed(() => {
    const botId = this.store.selectSignal(selectCurrentThreadId)();
    return this.getBotName(botId);
  });

  // viewcontainerRef
  @ViewChild('vcr', { read: ViewContainerRef }) _msgVcr!: ViewContainerRef;

  constructor(
    private store: Store,
    private injector: Injector,
    private botServ: BotsService,
    private action$: Actions,
    private destroyRef: DestroyRef
  ) {
    this.#promptMessage = this.store.selectSignal(selectPrompt);
    this.#responseMessage = this.store.selectSignal(selectResponse);

    this.action$
      .pipe(ofType(ChatThreadsActions.setCurrentThread))
      .subscribe(() => {
        this.onThreadChange();
      });
  }

  ngAfterViewInit(): void {
    effect(
      () => {
        this.displayMessage(this.#promptMessage());
        this.displayMessage(this.#responseMessage());

        // this.onThreadChange(this.#currentThread());
      },
      { injector: this.injector }
    );
  }

  onSubmit() {
    const msg = new Message(
      uuidv4(),
      new User('dummy_userid', 'sleepynut', '', false),
      new Date(),
      this.textForm.value.message || ''
    );

    this.store.dispatch(ChatWindowActions.chat({ message: msg }));

    // reset form
    this.textForm.reset();
  }

  onThreadChange() {
    // clear viewcontainerRef
    this._msgVcr.clear();

    // rerender each message from current thread
    this.store
      .select(selectThreadMessages)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((messages) => {
        messages?.forEach((m) => this.displayMessage(m));
      });
  }

  displayMessage(msg: Message | undefined) {
    if (msg === undefined) return;

    const ref = this._msgVcr.createComponent(MessageComponent);

    // doesnt work with input though; must use @Input instead
    ref.setInput('message', msg);
  }

  getBotName(botId: string): string {
    return this.botServ.getBot(botId)?.user.name || 'bot not found';
  }
}
