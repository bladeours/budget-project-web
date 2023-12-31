import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/features/authorization/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static ignoreJwt: boolean = false;
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (AuthInterceptor.ignoreJwt) {
      AuthInterceptor.ignoreJwt = false;
      return next.handle(request);
    }
    const accessToken = localStorage.getItem(AuthService.accessTokenKey);
    if (accessToken === null || this.jwtHelper.isTokenExpired(accessToken)) {
      return this.refreshToken(request, next);
    } else {
      return next.handle(this.getClonedRequest(request, accessToken));
    }
  }

  refreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.authService.refreshToken().pipe(
      catchError((error) => {
        localStorage.removeItem(AuthService.accessTokenKey);
        throw error;
      }),
      switchMap((response) => {
        const accessToken = response.data.refreshToken.jwt;
        const req = this.getClonedRequest(request, accessToken);
        this.authService.setAuth(accessToken);
        return next.handle(req);
      }),
    );
  }

  getClonedRequest(
    request: HttpRequest<unknown>,
    accessToken: string,
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
