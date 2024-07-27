import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private API_URL = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getUser(): Observable<any> {
        return this.http.get(`${this.API_URL}/users/me`);
    }
}
