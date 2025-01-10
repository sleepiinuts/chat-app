import {
  ApplicationConfig,
  InjectionToken,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { Action, ActionReducer, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ChatThreadsEffects } from './ngrx-store/chat-threads/chat-threads.effects';
import {
  chatThreadsFeatureKey,
  ChatThreadsReducer,
  State as ChatThreadsState,
} from './ngrx-store/chat-threads/chat-threads.reducer';
import { ChatWindowEffects } from './ngrx-store/chat-window/chat-window.effects';
import {
  chatWindowFeatureKey,
  reducer as chatWindowReducer,
} from './ngrx-store/chat-window/chat-window.reducer';

export const CHAT_THREADS_REDUCER_TOKEN = new InjectionToken<
  ActionReducer<ChatThreadsState, Action>
>('token for chat threads reducer');

export const chatThreadsReducerFactory = (
  ctr: ChatThreadsReducer
): ActionReducer<ChatThreadsState, Action> => {
  return ctr.createReducer();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState({ name: chatWindowFeatureKey, reducer: chatWindowReducer }),
    provideState(chatThreadsFeatureKey, CHAT_THREADS_REDUCER_TOKEN),
    provideEffects([ChatWindowEffects, ChatThreadsEffects]),
    {
      provide: CHAT_THREADS_REDUCER_TOKEN,
      deps: [ChatThreadsReducer],
      useFactory: chatThreadsReducerFactory,
    },
  ],
};
