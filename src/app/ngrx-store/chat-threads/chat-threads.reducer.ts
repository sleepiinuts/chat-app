import { Injectable } from '@angular/core';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { BotsService } from '../../components/bots/bots.service';
import { Thread } from '../../models/thread.model';
import { ChatThreadsActions } from './chat-threads.actions';

export const chatThreadsFeatureKey = 'chatThreads';

export interface State {
  currentThread: string;
  threads: Record<string, Thread>; // equivalent to map<string,Thread> js; but works with angular devtool;
}

@Injectable({
  providedIn: 'root',
})
export class ChatThreadsReducer {
  initialState: State = {
    currentThread: '1',
    threads: {},
  };
  constructor(private botsServ: BotsService) {
    // do the actual initial state setup
    this.initialThreads();
  }

  initialThreads() {
    const bots = this.botsServ.getBots();

    // set up thread for each bot
    bots.forEach((b) => {
      this.initialState.threads[b.id] = new Thread(b, undefined, undefined);
    });
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
      ),
      on(ChatThreadsActions.newMessage, (state, props): State => {
        // clone state -> newState
        const newState = cloneDeep(state);

        // set latest message
        const thread = newState.threads[props.threadId];
        thread.latestMessage = props.message;

        // handle adding to empty thread
        thread.messages = thread.messages
          ? [...thread.messages, props.message]
          : [props.message];

        // append messages
        return newState;
      })
    );
  }
}
