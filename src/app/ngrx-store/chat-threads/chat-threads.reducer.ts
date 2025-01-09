import { Injectable } from '@angular/core';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { BotsService } from '../../components/bots/bots.service';
import { ChatThreadsActions } from './chat-threads.actions';

export const chatThreadsFeatureKey = 'chatThreads';

export interface State {
  currentThread: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatThreadsReducer {
  initialState: State;
  constructor(private botsServ: BotsService) {
    this.initialState = { currentThread: '' };
  }

  createReducer(): ActionReducer<State, Action> {
    return createReducer(
      this.initialState,
      on(
        ChatThreadsActions.setCurrentThread,
        (state, props): State => ({
          ...state,
          currentThread: props.currentThread,
        })
      )
    );
  }
}
