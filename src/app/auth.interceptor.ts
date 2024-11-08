import { HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Token ${token}`
            }
        });
    }
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                localStorage.removeItem('access_token');
                const router = new Router();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
}