import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChatNavbarComponent } from './components/chat-navbar/chat-navbar.component';
import { ChatThreadsComponent } from './components/chat-threads/chat-threads.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    ChatNavbarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-app';
}
