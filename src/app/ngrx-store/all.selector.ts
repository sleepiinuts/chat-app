import { createFeatureSelector, createSelector } from '@ngrx/store';
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

// chatWindow:botId
export const selectBotId = createSelector(
  selectChatWindowState,
  (state) => state.botId
);
