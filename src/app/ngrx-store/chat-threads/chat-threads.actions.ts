import { createActionGroup, props } from '@ngrx/store';
import { Message } from '../../models/message.model';

export const ChatThreadsActions = createActionGroup({
  source: 'ChatThreads',
  events: {
    'Set CurrentThread': props<{ currentThread: string }>(),
    'New Message': props<{ threadId: string; message: Message }>(),
    'Switch Thread': props<{ threadId: string }>(),
    'Mark Read': props<{ threadId: string }>(),
  },
});
