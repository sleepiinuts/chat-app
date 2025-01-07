import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChatWindowEffects } from './chat-window.effects';

describe('ChatWindowEffects', () => {
  let actions$: Observable<any>;
  let effects: ChatWindowEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatWindowEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ChatWindowEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
