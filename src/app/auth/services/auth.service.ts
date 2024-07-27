import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {
        const token = this.sessionStorageService.getToken();
        this.isAuthorized$$.next(!!token);
    }

    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        console.debug(environment);
        console.debug(environment.baseUrl);
        return this.http.post(`${environment.baseUrl}/login`, user)
            .pipe(tap((response: any) => {
                this.sessionStorageService.setToken(response.result.split(' ')[1]);
                this.isAuthorized$$.next(true);
            }),
                catchError(error => {
                    console.error('Login error', error);
                    return throwError(error);
                }));
    }

    logout() {
        // Add your code here
        let token = this.sessionStorageService.getToken();
        // token = 'lurzdBeikQ+716X5OYeruZT+/GWKxSL29lILwfHAs4w94zZ/tOq49QbiXSAhVF58Vef3BT+YPAaYzL8QNY8Y8evyKPGsYHfHKoHKk+9OBkzJ2ZTJkTpFhOhX6uhFgkaL+cCTok+3PncNNIFPR3sXJkBq2Kt8RomhJmNKKw+VPW5Tvjc06gLbhmEuLWPOq+lOwBwQQrB8xbxRBLfW53m6XjgaGN9+F3xxSWUQv/RrB6ayWe+y1hOAnRBmXYd56tTFfxR0zc3iJKX1+cDG5hdIOXSuyAHs6RaA2a5K1C0ssJB5fKB5kzELOj7ZHtGjcWPaSKCK8OjEbHYH8hpI6cGVHA==';

        const headers = { 'Authorization': `Bearer ${token}` };
        this.http.delete(`${environment.baseUrl}/logout`, { headers })
            .subscribe({
                next: () => {
                    this.sessionStorageService.deleteToken();
                    this.isAuthorized$$.next(false);
                },
                error: (error) => {
                    console.error('Logout failed', error);
                }
            });
    }

    register(user: User) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post(`${environment.baseUrl}/register`, user, httpOptions)
            .pipe(tap((response: any) => {
                console.debug(response.result);
            }),
                catchError(error => {
                    console.error('Registration error', error);
                    return throwError(error);
                }));
    }

    get isAuthorised() {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.getValue();
    }

    set isAuthorised(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        // Add your code here
        return '/login';
    }
}
