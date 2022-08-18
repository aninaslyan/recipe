import { Action, createReducer, on } from '@ngrx/store';

import { initialState } from './auth.state';
import * as AuthActions from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginUser, (state) => {
    return {
      ...state
    };
  })
);

export function authReducer(state, action: Action) {
  return _authReducer(state, action);
}
