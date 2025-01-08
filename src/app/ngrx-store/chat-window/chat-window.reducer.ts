import { createReducer, on } from '@ngrx/store';
import { Message } from '../../models/message.model';
import { ChatWindowActions } from './chat-window.actions';

export const chatWindowFeatureKey = 'chatWindow';

export interface State {
  messages: Message[];
  promptMessage: Message | undefined;
  responseMessage: Message | undefined;
}

export const initialState: State = {
  messages: [],
  promptMessage: undefined,
  responseMessage: undefined,
};

export const reducer = createReducer(
  initialState,
  on(
    ChatWindowActions.setMessages,
    (state, props): State => ({
      ...state,
      messages: props.messages,
    })
  ),
  on(
    ChatWindowActions.setPromptMessage,
    (state, props): State => ({
      ...state,
      promptMessage: props.message,
    })
  ),
  on(
    ChatWindowActions.setResponseMessage,
    (state, props): State => ({
      ...state,
      responseMessage: props.message,
    })
  )
);
