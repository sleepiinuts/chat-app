import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChatThreadsEffects } from './chat-threads.effects';

describe('ChatThreadsEffects', () => {
  let actions$: Observable<any>;
  let effects: ChatThreadsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatThreadsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ChatThreadsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
