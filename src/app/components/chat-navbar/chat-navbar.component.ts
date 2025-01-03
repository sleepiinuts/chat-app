import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-navbar',
  imports: [MatButtonModule, MatBadgeModule],
  templateUrl: './chat-navbar.component.html',
  styleUrl: './chat-navbar.component.scss',
})
export class ChatNavbarComponent {}
