import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, concatMap, EMPTY, exhaustMap, map, of } from 'rxjs';
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

  // chained from ChatWindowActions.chat
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

  response$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.chat),
      concatLatestFrom(() => this.store.select(selectCurrentThreadId)),
      concatMap(([props, botId]) =>
        this.chatWindowServ.chat(props.message, botId).pipe(
          // tap((resp) => console.log(`resp: ${resp.text}`)),
          map((resp) =>
            ChatWindowActions.response({ response: resp, threadId: botId })
          ),
          catchError(() => EMPTY) // TODO: error handling?
        )
      )
    );
  });

  // chained from setPromptMessaage$
  setResponseMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.response),
      exhaustMap((props) =>
        of(ChatWindowActions.setResponseMessage({ message: props.response }))
      )
    );
  });

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
