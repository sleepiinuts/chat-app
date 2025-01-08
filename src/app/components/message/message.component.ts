import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  @Input() message!: Message;
}
