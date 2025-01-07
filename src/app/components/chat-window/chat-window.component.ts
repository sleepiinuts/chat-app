import { Component, effect, Signal } from '@angular/core';
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
import { selectPrompt, selectResponse } from '../../ngrx-store/all.selector';
import { ChatWindowActions } from '../../ngrx-store/chat-window/chat-window.actions';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-chat-window',
  imports: [MatIconModule, MessageComponent, ReactiveFormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
  textForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  #promptMessage: Signal<Message | undefined>;
  #responseMessage: Signal<Message | undefined>;

  constructor(private store: Store) {
    this.#promptMessage = this.store.selectSignal(selectPrompt);
    this.#responseMessage = this.store.selectSignal(selectResponse);

    effect(() => {
      console.log(`promp signal: ${this.#promptMessage()?.text}`);
      console.log(`response signal: ${this.#responseMessage()?.text}`);
    });
  }

  onSubmit() {
    const msg = new Message(
      uuidv4(),
      new User('dummy_userid', 'sleepynut', '', false),
      new Date(),
      this.textForm.value.message || ''
    );

    // console.log(`message: ${msg.text}`);
    // console.log(`valid: ${this.textForm.valid}`);

    this.store.dispatch(ChatWindowActions.chat({ message: msg }));
  }
}
