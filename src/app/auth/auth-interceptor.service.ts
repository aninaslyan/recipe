import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { userData } from './store/auth.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  user$ = this.store.select(userData);

  constructor(private authService: AuthService, private store: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.user$.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      }));
  }
}
