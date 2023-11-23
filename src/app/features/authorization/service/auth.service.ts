import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { baseUrl } from 'src/app/environments/environment';
import { AuthenticateGQL } from 'src/app/graphql/__generated__';
import { JwtResponse } from '../models/JwtResponse';
import { AuthInput } from '../models/LoginForm';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static readonly accessTokenKey = 'accessToken';

  constructor(private httpClient: HttpClient, private authenticateGQL: AuthenticateGQL) {}

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthService.accessTokenKey) !== null;
  }

  register(data: AuthInput) {
    AuthInterceptor.ignoreJwt = true;
    return this.httpClient.post<JwtResponse>(`${baseUrl}/auth/register`, data, {
      withCredentials: true,
    });
  }

  login(authInput: AuthInput): Observable<any> {
    AuthInterceptor.ignoreJwt = true;

    
    return this.authenticateGQL.mutate({authInput});

    // return this.httpClient.post<JwtResponse>(
    //   `${baseUrl}/auth/authenticate`,
    //   data,
    //   { withCredentials: true }
    // );
  }

  setAuth(response: JwtResponse) {
    localStorage.setItem(AuthService.accessTokenKey, response.jwt);
  }

  refreshToken() {
    AuthInterceptor.ignoreJwt = true;
    return this.httpClient.post<JwtResponse>(
      `${baseUrl}/auth/refreshtoken`,
      undefined,
      { withCredentials: true }
    );
  }

  logout() {
    return this.httpClient.post(`${baseUrl}/auth/logout`, undefined, {
      withCredentials: true,
    });
  }
}
