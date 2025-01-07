import { Component, input } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  messge = input<Message>();
}
