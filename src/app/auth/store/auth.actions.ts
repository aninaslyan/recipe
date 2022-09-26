import { createHTTPActions } from '../../shared/state/state.helpers';
import { createAction } from '@ngrx/store';

export const [loginUser, loginUserSuccess, loginUserError] =
  createHTTPActions<{ email: string, password: string },
    { email: string, localId: string, idToken: string, expiresIn: string }>('[Auth] Login User');

export const [signUpUser, signUpUserSuccess, signUpUserError] = createHTTPActions<{ email: string, password: string },
  { email: string, localId: string, idToken: string, expiresIn: Date }>('[Auth] Sign up User');

export const closeAuthAlert = createAction('[Auth] Close Auth Alert');
