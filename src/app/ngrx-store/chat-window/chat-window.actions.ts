import { createActionGroup, props } from '@ngrx/store';
import { Message } from '../../models/message.model';

export const ChatWindowActions = createActionGroup({
  source: 'ChatWindow',
  events: {
    Chat: props<{ message: Message }>(),
    Prompt: props<{ prompt: Message; threadId: string }>(),
    Response: props<{ response: Message; threadId: string }>(),
    'Set Messages': props<{ messages: Message[] }>(),
    'Set Prompt Message': props<{ message: Message }>(),
    'Set Response Message': props<{ message: Message }>(),
  },
});

// chat
//   - prompt
//       - [thread] new Message
//       - set prompt
//   - response
//       - [thread] new Message
//       - set response
