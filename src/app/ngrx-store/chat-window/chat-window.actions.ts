import { createActionGroup, props } from '@ngrx/store';
import { Message } from '../../models/message.model';

export const ChatWindowActions = createActionGroup({
  source: 'ChatWindow',
  events: {
    Chat: props<{ message: Message }>(),
    'Set Messages': props<{ messages: Message[] }>(),
  },
});
