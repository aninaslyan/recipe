import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<IAuthResponseData>(environment.userUrl, {
      email,
      password,
      returnSecureToken: true
    })
    .pipe(catchError(errorRes => {
      let errorMessage: string;

      if(!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Too many requests';
          break;
        default:
          errorMessage = 'An unknown error occurred';
      }

      return throwError(errorMessage);
    }));
  }
}
