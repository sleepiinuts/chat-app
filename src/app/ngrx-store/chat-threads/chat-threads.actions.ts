import { createActionGroup, props } from '@ngrx/store';

export const ChatThreadsActions = createActionGroup({
  source: 'ChatThreads',
  events: {
    'Set CurrentThread': props<{ currentThread: string }>(),
  },
});
