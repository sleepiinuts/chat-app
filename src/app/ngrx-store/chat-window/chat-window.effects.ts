import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, map, mergeMap, of } from 'rxjs';
import { selectCurrentThreadId } from '../all.selector';
import { ChatThreadsActions } from '../chat-threads/chat-threads.actions';
import { ChatWindowActions } from './chat-window.actions';
import { ChatWindowService } from './chat-window.service';

@Injectable()
export class ChatWindowEffects {
  private action$ = inject(Actions);
  constructor(
    private chatWindowServ: ChatWindowService,
    private store: Store
  ) {}

  // chained from ChatWindowActions.chat
  prompt$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.chat),
      concatLatestFrom(() => this.store.select(selectCurrentThreadId)),
      exhaustMap(([props, botId]) =>
        of(
          ChatWindowActions.prompt({
            threadId: botId,
            prompt: props.message,
          })
        )
      )
    );
  });

  // chained from ChatWindowActions.prompt
  setPromptMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.prompt),
      exhaustMap((props) => {
        return of(
          ChatWindowActions.setPromptMessage({
            message: props.prompt,
          })
        );
      })
    );
  });

  // chained from ChatWindowActions.prompt
  addPromptToThread$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.prompt),
      exhaustMap((props) => {
        return of(
          ChatThreadsActions.newMessage({
            threadId: props.threadId,
            message: props.prompt,
          })
        );
      })
    );
  });

  // chained from ChatWindowActions.chat
  // mergeMap: merge source value; each source value starts on its own
  // concatMap: combine source value orderly;each source value starts after completion of another
  response$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.chat),
      concatLatestFrom(() => this.store.select(selectCurrentThreadId)),
      mergeMap(([props, threadId]) =>
        this.chatWindowServ.chat(props.message, threadId).pipe(
          // tap((resp) => console.log(`resp: ${resp.text}`)),
          map((resp) =>
            ChatWindowActions.response({
              response: resp,
              threadId: threadId,
            })
          ),
          catchError(() => EMPTY) // TODO: error handling?
        )
      )
    );
  });

  // chained from ChatWindowActions.response
  setResponseMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.response),
      exhaustMap((props) =>
        of(ChatWindowActions.setResponseMessage({ message: props.response }))
      )
    );
  });

  // chained from ChatWindowActions.response
  addResponseToThread$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.response),
      exhaustMap((props) =>
        of(
          ChatThreadsActions.newMessage({
            threadId: props.threadId,
            message: props.response,
          })
        )
      )
    );
  });
}
