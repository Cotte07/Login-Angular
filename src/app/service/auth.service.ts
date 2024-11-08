import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
                })
            );
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }
}