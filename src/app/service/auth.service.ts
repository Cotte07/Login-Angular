import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8100';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/api-token-auth/`, { username, password })
            .pipe(
                tap((response: any) => {
                    if (response.token) {
                        localStorage.setItem('access_token', response.token);
                    }
                }),
                catchError(error => {
                    console.error('Login error:', error);
                    return throwError(() => new Error('Authentication failed'));
                })
            );
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('access_token');
    }

    getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('access_token');
        return new HttpHeaders({
            'Authorization': token ? `Token ${token}` : ''
        });
    }
}