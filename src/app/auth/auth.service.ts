import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  private static handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no registered user with this email!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many requests. Try again later!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid!';
        break;
    }

    return throwError(errorMessage);
  }

  signUp(email: string, password: string) {
    return this.http.post<IAuthResponseData>(environment.userSignUp, {
      email,
      password,
      returnSecureToken: true
    })
    .pipe(catchError(AuthService.handleError));
  }

  logIn(email: string, password: string) {
    return this.http.post<IAuthResponseData>(environment.userLogIn, {
      email,
      password,
      returnSecureToken: true
    })
    .pipe(catchError(AuthService.handleError));
  }
}
