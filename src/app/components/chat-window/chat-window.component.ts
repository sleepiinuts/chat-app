import { TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  Injector,
  Signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import {
  selectCurrentThreadId,
  selectPrompt,
  selectResponse,
} from '../../ngrx-store/all.selector';
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

  @ViewChild('vcr', { read: ViewContainerRef }) _msgVcr!: ViewContainerRef;

  constructor(
    private store: Store,
    private injector: Injector,
    private botServ: BotsService
  ) {
    this.#promptMessage = this.store.selectSignal(selectPrompt);
    this.#responseMessage = this.store.selectSignal(selectResponse);
  }

  ngAfterViewInit(): void {
    effect(
      () => {
        // console.log(`promp signal: ${this.#promptMessage()?.text}`);
        // console.log(`response signal: ${this.#responseMessage()?.text}`);
        this.displayMessage(this.#promptMessage());
        this.displayMessage(this.#responseMessage());
      },
      { injector: this.injector }
    );
    // this._msgVcr.createComponent(MessageComponent);
    // this._msgVcr.createComponent(MessageComponent);
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
