import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthAlertComponent } from './components/auth-alert/auth-alert.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    AuthAlertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule {
}
