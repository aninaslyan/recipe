import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { closeAuthAlert } from '../../store/auth.actions';

@Component({
  selector: 'app-auth-alert',
  templateUrl: './auth-alert.component.html',
  styleUrls: ['./auth-alert.component.css']
})
export class AuthAlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  constructor(private store: Store) {
  }

  onClose() {
    this.store.dispatch(closeAuthAlert());
  }
}
