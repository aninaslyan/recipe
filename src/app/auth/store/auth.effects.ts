import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {

  loginUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginUser),
        mergeMap(({ payload }) =>
          this.authService.logIn(payload.email, payload.password).pipe(
            map(response => AuthActions.loginUserSuccess('', response)),
            catchError(error => of(AuthActions.loginUserError(error)))
          ))
      )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginUserSuccess, AuthActions.signUpUserSuccess),
        tap(({ payload }) => {
          this.authService.handleAuthentication(payload.email, payload.localId, payload.idToken, +payload.expiresIn);
          this.router.navigate(['/recipes']);
        })
      ), { dispatch: false }
  );

  constructor(private readonly actions$: Actions, private readonly authService: AuthService, private router: Router) {
  }

}
