import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { loginUser, signUpUser } from './store/auth.actions';
import { alertMessage, authLoading } from './store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;

  loading$ = this.store.select(authLoading);
  alertMessage$ = this.store.select(alertMessage);

  constructor(private authService: AuthService, private router: Router, private store: Store) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(loginUser({email, password}));
    } else {
      this.store.dispatch(signUpUser({email, password}));
    }

    // authObs.subscribe(resData => {
    //   console.log(resData);
    //   // this.isLoading = false;
    //   // this.router.navigate(['/recipes']);
    // }, errorMessage => {
    //   this.showErrorAlert(errorMessage);
    //   this.isLoading = false;
    // });

    form.reset();
  }
}
