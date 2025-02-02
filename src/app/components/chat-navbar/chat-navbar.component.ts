import { Component, Signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectTotalUnread } from '../../ngrx-store/all.selector';

@Component({
  selector: 'app-chat-navbar',
  imports: [MatButtonModule, MatBadgeModule],
  templateUrl: './chat-navbar.component.html',
  styleUrl: './chat-navbar.component.scss',
})
export class ChatNavbarComponent {
  totalUnread: Signal<number>;

  constructor(private store: Store) {
    this.totalUnread = this.store.selectSignal(selectTotalUnread);
  }
}
