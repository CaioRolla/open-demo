import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  JwtTokenDto,
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResendRegisterConfirmationDto,
  ResetPasswordDto,
} from '@demo/+auth/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthConfig } from '../auth-app.config';
import {
  errorHandler,
  fetchDataHandler,
  requestHandler,
} from '@demo/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _config: AuthConfig
  ) {}

  public getStripeCustomerPortalURL(): Observable<{ url: string }> {
    return this._http
      .get(`${this._config.baseApi}/v1/account/stripe-customer-portal`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public resetPassword(dto: ResetPasswordDto): Observable<JwtTokenDto> {
    return this._http
      .post(
        `${this._config.baseApi}/v1/auth/reset-password`,
        requestHandler(dto)
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public forgotPassword(dto: ForgotPasswordDto): Observable<void> {
    return this._http
      .post(
        `${this._config.baseApi}/v1/auth/forgot-password`,
        requestHandler(dto)
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public resendRegisterConfirmation(
    dto: ResendRegisterConfirmationDto
  ): Observable<void> {
    return this._http
      .post(
        `${this._config.baseApi}/v1/auth/resend-register-confirmation`,
        requestHandler(dto)
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public login(dto: LoginDto): Observable<JwtTokenDto> {
    return this._http
      .post(`${this._config.baseApi}/v1/auth/login`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }

  public register(dto: RegisterDto): Observable<void> {
    return this._http
      .post(`${this._config.baseApi}/v1/auth/register`, requestHandler(dto))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(errorHandler(err));
        }),
        map((res) => fetchDataHandler(res))
      );
  }
}
