import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { selectBotId } from '../all.selector';
import { ChatWindowActions } from './chat-window.actions';
import { ChatWindowService } from './chat-window.service';

@Injectable()
export class ChatWindowEffects {
  private action$ = inject(Actions);
  constructor(
    private chatWindowServ: ChatWindowService,
    private store: Store
  ) {}

  newMessage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ChatWindowActions.chat),
      concatLatestFrom(() => this.store.select(selectBotId)),
      exhaustMap(([props, botId]) =>
        this.chatWindowServ.chat(props.message, botId).pipe(
          map((messages) =>
            ChatWindowActions.setMessages({ messages: messages })
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
