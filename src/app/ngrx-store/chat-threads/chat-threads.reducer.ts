import { createReducer, on } from '@ngrx/store';
import { ChatThreadsActions } from './chat-threads.actions';

export const chatThreadsFeatureKey = 'chatThreads';

export interface State {
  currentThread: string;
}

export const initialState: State = {
  currentThread: '',
};

export const reducer = createReducer(
  initialState,
  on(
    ChatThreadsActions.setCurrentThread,
    (state, props): State => ({
      ...state,
      currentThread: props.currentThread,
    })
  )
);
