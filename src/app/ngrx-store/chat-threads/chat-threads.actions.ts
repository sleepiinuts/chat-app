import { createActionGroup, props } from '@ngrx/store';
import { Message } from '../../models/message.model';

export const ChatThreadsActions = createActionGroup({
  source: 'ChatThreads',
  events: {
    'Set CurrentThread': props<{ currentThread: string }>(),
    'New Messages': props<{ threadId: string; messages: Message[] }>(),
    'Switch Thread': props<{ threadId: string }>(),
  },
});
