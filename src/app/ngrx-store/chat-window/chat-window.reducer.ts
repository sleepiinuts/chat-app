import { createReducer, on } from '@ngrx/store';
import { Message } from '../../models/message.model';
import { ChatWindowActions } from './chat-window.actions';

export const chatWindowFeatureKey = 'chatWindow';

export interface State {
  messages: Message[];
  botId: string;
}

export const initialState: State = {
  messages: [],
  botId: '2',
};

export const reducer = createReducer(
  initialState,
  on(
    ChatWindowActions.setMessages,
    (state, props): State => ({
      ...state,
      messages: props.messages,
    })
  )
);
