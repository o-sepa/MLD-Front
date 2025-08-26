import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthStatus } from '@auth/interfaces/auth-status.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  private _authStatus = signal<AuthStatus>('checking');
  private _token = signal<string|null>(localStorage.getItem('token'));

  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking') return 'checking';
    return 'not-authenticated'
  });

  token = computed<string|null>(() => this._token());

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/autenticacion/login`, {username, password}, { responseType: 'text' })
    .pipe(
      map(resp => this.handleLoginSuccess(`${resp}`)),
      catchError((error: any) => this.handleLoginError(error))
    );
  }

  logout(){
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  /*
  Why're we returning a plain boolean value in the success handler but not in the error?
  In rxJs:
  - map() -> whatever it's returning is delivered as the value of an observer (we don't need to scope it inside an of() because map() already does it for us!)
  - catchError() -> may or may not return an observable (but our service function DOES, so we MUST scope it inside an of())
  */
  private handleLoginSuccess(resp: string){
    this._authStatus.set('authenticated');
    this._token.set(resp);

    localStorage.setItem('token', resp);

    return true;
  }

  private handleLoginError(error: any): Observable<boolean> {
    this.logout();
    return of(false);
  }

}

