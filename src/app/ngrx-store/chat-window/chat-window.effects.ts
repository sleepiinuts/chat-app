import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import { selectCurrentThreadId, selectLatestMsg } from '../all.selector';
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

  chat$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.chat),
      concatLatestFrom(() => this.store.select(selectCurrentThreadId)),
      exhaustMap(([props, botId]) => {
        return this.chatWindowServ.chat(props.message, botId).pipe(
          map((messages) =>
            ChatThreadsActions.newMessages({
              threadId: botId,
              messages: messages,
            })
          ),
          catchError(() => EMPTY)
        );
      })
    );
  });

  // chained from ChatWindowActions.setMessages
  setPromptMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatThreadsActions.newMessages),
      exhaustMap((props) => {
        const n = props.messages.length;

        return of(
          ChatWindowActions.setPromptMessage({
            message: props.messages[n - 2],
          })
        );
      })
    );
  });

  // chained from setPromptMessaage$
  setResponseMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.setPromptMessage),
      concatLatestFrom(() => this.store.select(selectLatestMsg)),
      exhaustMap(([, message]) => {
        // TODO: error handling
        if (message === undefined) return EMPTY;

        return of(
          ChatWindowActions.setResponseMessage({
            message: message,
          })
        );
      })
    );
  });
}
