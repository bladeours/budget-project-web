import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/environments/environment';
import { LoginForm } from '../models/LoginForm';
import { AuthResponse } from '../models/AuthResponse';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  public static readonly accessTokenKey = "accessToken";

  constructor(private httpClient: HttpClient) {}

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthService.accessTokenKey) !== null;
  }

  register(data: LoginForm) {
    AuthInterceptor.ignoreJwt = true;
    return this.httpClient.post<AuthResponse>(`${baseUrl}/auth/register`, data, {withCredentials: true});
  }


  login(data: LoginForm) {
    AuthInterceptor.ignoreJwt = true;
    return this.httpClient.post<AuthResponse>(`${baseUrl}/auth/authenticate`, data, {withCredentials: true});
  }

  setAuth(response: AuthResponse) {
    localStorage.setItem(AuthService.accessTokenKey, response.jwt);
  }

  refreshToken() {
    AuthInterceptor.ignoreJwt = true;
    return this.httpClient.post<AuthResponse>(`${baseUrl}/auth/refreshtoken`, undefined, {withCredentials: true});
  }

  logout() {
    return this.httpClient.post(`${baseUrl}/auth/logout`, undefined, {withCredentials: true});

  }

}
