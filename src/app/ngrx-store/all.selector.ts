import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  chatThreadsFeatureKey,
  State as ChatThreadsState,
} from './chat-threads/chat-threads.reducer';
import {
  chatWindowFeatureKey,
  State as ChatWindowState,
} from './chat-window/chat-window.reducer';

export interface AppState {
  chatWindow: ChatWindowState;
}

// chatWindow:state
export const selectChatWindowState =
  createFeatureSelector<ChatWindowState>(chatWindowFeatureKey);

// chatWindow:promptMessage
export const selectPrompt = createSelector(
  selectChatWindowState,
  (state) => state.promptMessage
);

// chatWindow:responseMessage
export const selectResponse = createSelector(
  selectChatWindowState,
  (state) => state.responseMessage
);

// chatThreads:state
export const selectChatThreadState = createFeatureSelector<ChatThreadsState>(
  chatThreadsFeatureKey
);

// chatThreads:currentThread
export const selectCurrentThreadId = createSelector(
  selectChatThreadState,
  (state) => state.currentThread
);

// chatThreads:latest message from currentThread
export const selectLatestMsg = createSelector(
  selectChatThreadState,
  (state) => state.threads[state.currentThread].latestMessage
);
