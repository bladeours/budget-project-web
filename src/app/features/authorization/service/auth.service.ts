import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthInterceptor} from 'src/app/core/interceptors/auth.interceptor';
import {AuthenticateGQL, LogoutGQL, RefreshTokenGQL, RegisterGQL} from 'src/app/graphql/__generated__';
import {AuthInput} from '../models/AuthInput';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static readonly accessTokenKey = 'accessToken';

  constructor(private logoutGQL: LogoutGQL,
              private authenticateGQL: AuthenticateGQL,
              private registerGQL: RegisterGQL,
              private refreshTokenGQL: RefreshTokenGQL) {}

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem(AuthService.accessTokenKey);
    return accessToken !== null && accessToken !== undefined;
  }

  register(authInput: AuthInput): Observable<any> {
    AuthInterceptor.ignoreJwt = true;
    return this.registerGQL.mutate({authInput});
  }

  login(authInput: AuthInput): Observable<any> {
    AuthInterceptor.ignoreJwt = true;
    return this.authenticateGQL.mutate({authInput});
  }

  setAuth(jwt: string) {
    localStorage.setItem(AuthService.accessTokenKey, jwt);
  }

  refreshToken(): Observable<any> {
    AuthInterceptor.ignoreJwt = true;
    return this.refreshTokenGQL.mutate({});
  }

  logout() {
    return this.logoutGQL.mutate();
  }
}
