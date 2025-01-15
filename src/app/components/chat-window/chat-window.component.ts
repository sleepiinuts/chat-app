import { TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
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
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import {
  selectCurrentThreadId,
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
    this.action$
      .pipe(ofType(ChatThreadsActions.setCurrentThread))
      .subscribe(() => {
        this.onThreadChange();
      });
  }

  ngAfterViewInit(): void {
    // effect: this runs on every change; causing both signal to runs
    // if only one of the two signals has change; the other signal will give old value -- which is not intended
    // effect(
    //   () => {
    //     this.displayMessage(this.#promptMessage());
    //     this.displayMessage(this.#responseMessage());

    //     // this.onThreadChange(this.#currentThread());
    //   },
    //   { injector: this.injector }
    // );

    // listen to prompt message
    this.action$
      .pipe(ofType(ChatWindowActions.setPromptMessage))
      .subscribe((props) => this.displayMessage(props.message));

    // listen to response message
    this.action$
      .pipe(
        ofType(ChatWindowActions.setResponseMessage),
        concatLatestFrom(() => this.store.select(selectCurrentThreadId)),
        filter(([props, threadId]) => props.message.user?.id === threadId)
      )
      .subscribe(([props]) => this.displayMessage(props.message));
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
