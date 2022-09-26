import { Action, createReducer, on } from '@ngrx/store';

import { initialState } from './auth.state';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginUser, (state) => ({
      ...state,
      loading: true
    })
  ),
  on(AuthActions.loginUserSuccess, (state) => ({
      ...state,
      loading: false
    })
  ),
  on(AuthActions.loginUserError, AuthActions.signUpUserError, (state, { payload }) => ({
      ...state,
      loading: false,
      alertMessage: AuthService.handleError(payload)
    })
  ),
  on(AuthActions.closeAuthAlert, (state) => ({
      ...state,
      alertMessage: null
    }),
  ),
);

export function authReducer(state, action: Action) {
  return _authReducer(state, action);
}
