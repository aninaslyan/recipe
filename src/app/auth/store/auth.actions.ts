import { createHTTPActions } from '../../shared/state-helper/state.helpers';
import { createAction } from '@ngrx/store';

import { IAuthResponseData } from '../auth.service';

export const [loginUser, loginUserSuccess, loginUserError] = createHTTPActions<{ email: string, password: string }, IAuthResponseData>('[Auth] Login User');

export const [signUpUser, signUpUserSuccess, signUpUserError] = createHTTPActions<{ email: string, password: string }, IAuthResponseData>('[Auth] Sign up User');

export const closeAuthAlert = createAction('[Auth] Close Auth Alert');

export const userData = createAction('[Auth] User data', userData => ({ payload: userData }))
