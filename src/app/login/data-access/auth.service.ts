import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = `${environment.backendBaseUrl}/auth`;
  private _currentUserSubject: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$: Observable<LoginResponse | null> = this._currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  // Login method
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<{ token: string }>(`${this._baseUrl}/login`, request).pipe(
      tap(response => {
        if (response && response.token) {
          // Store token and user information
          localStorage.setItem('authToken', response.token);
          this._currentUserSubject.next({ token: response.token } as LoginResponse);
        } else {
          console.error('Login response does not contain token:', response);
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  // Register method
  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(`${this._baseUrl}/register`, request);
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('authToken');
    this._currentUserSubject.next(null);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get the current user
  getCurrentUser(): Observable<LoginResponse | null> {
    return this.currentUser$;
  }
}
