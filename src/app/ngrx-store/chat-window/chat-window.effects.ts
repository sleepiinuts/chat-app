import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import { selectChatWindowState, selectCurrentThreadId } from '../all.selector';
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
            ChatWindowActions.setMessages({ messages: messages })
          ),
          catchError(() => EMPTY)
        );
      })
    );
  });

  // chained from ChatWindowActions.setMessages
  setPromptMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.setMessages),
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
      concatLatestFrom(() => this.store.select(selectChatWindowState)),
      exhaustMap(([, state]) => {
        const n = state.messages.length;

        return of(
          ChatWindowActions.setResponseMessage({
            message: state.messages[n - 1],
          })
        );
      })
    );
  });
}
