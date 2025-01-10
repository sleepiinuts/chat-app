import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { EMPTY, of, switchMap } from 'rxjs';
import { selectCurrentThreadId } from '../all.selector';
import { ChatThreadsActions } from './chat-threads.actions';

@Injectable()
export class ChatThreadsEffects {
  private actions$: Actions = inject(Actions);

  constructor(private store: Store) {}

  switchThread$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatThreadsActions.switchThread),
      concatLatestFrom(() => this.store.select(selectCurrentThreadId)),
      switchMap(([props, tid]) => {
        // update currentThreadId
        if (props.threadId !== tid)
          return of(
            ChatThreadsActions.setCurrentThread({
              currentThread: props.threadId,
            })
          );

        // do nothing for selecting same thread
        return EMPTY;
      })
    );
  });
}
