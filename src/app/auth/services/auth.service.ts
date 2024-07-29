import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';
import { UserStoreService } from '@app/user/services/user-store.service';

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

    constructor(
        private userStoreService: UserStoreService,
        private http: HttpClient,
        private sessionStorageService: SessionStorageService
    ) {
        const token = this.sessionStorageService.getToken();
        //this.sessionStorageService.setToken('I+mFJHkSoO01YPrCbOVCB4deuE2woLvPgqEUqMbhdcAXLvIOspJA6pjSAT45gytjlpvKUAE50Xjgv9ewV3HfZb/yWhvzcR3cV2+mXeLPDu/cMqiW0qqx+B713K4y5TbMK4J2yLtk3+Bk6osKIlp2UskFkaR6HtWHfHeg3MnPHpJBGw3+rb33pE1KCIDZalSyjz6XiPzudl7ZNN+ihsrEpEo8NozgLAEXGIbbe21jxt4du3qBmiR/AjNQx1YkaJ7OQ3oX9oOpHoHOt10kvFi7mc23fFKIyTFicGHcvVGlFwXUdcvtR42D4WUfPqt8XdOFC6nP6YxCkXSGYEqcjdL2bg==');
        this.isAuthorized$$.next(!!token);
    }

    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post(`${environment.baseUrl}/login`, user)
            .pipe(tap((response: any) => {
                this.sessionStorageService.setToken(response.result.split(' ')[1]);
                this.isAuthorized$$.next(true);
                // this.userStoreService.name = response.user.name;
                // this.userStoreService.isAdmin = response.result.role === 'admin';
                this.userStoreService.getUser();
                console.debug(`response is ${response}`);
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
