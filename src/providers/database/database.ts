import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

@Injectable()
export class DatabaseProvider {

    private hasResult: any;
    private url: string;

    constructor(public http: Http, public platform: Platform) { }

    getAllActivatedArticles(): Observable<any> {
        return this.http.get("http://localhost/listeo-desktop/src/api/database/getAllActivatedArticles.php")
            .map(res => {
                this.hasResult = res;
                if (this.hasResult._body !== '0') {
                    return res.json();
                }
                else {
                    return res.text();
                }
            });
    }

    checkLoginCredentials(data): Observable<any> {
        return this.http.post("http://localhost/listeo-desktop/src/api/database/checkLoginCredentials.php", data)
            .map(res => {
                this.hasResult = res;
                if (this.hasResult._body !== '0') {
                    return res.json();
                }
                else {
                    return res.text();
                }
            });
    }

    registerWithGoogle(data): Observable<any> {
        return this.http.post("http://localhost/listeo/src/api/database/mobile/registerWithGoogle.php", data)
            .map(res => {
                return res.text();
            });
    }

    getTopRatedLocations(user): Observable<any> {
        return this.http.post('http://localhost/listeo-desktop/src/api/database/getTopRatedLocations.php', user)
            .map(response => {
                this.hasResult = response;
                if (this.hasResult._body !== 'Not found') {
                    return response.json();
                }
                else {
                    return response.text();
                }
            });
    }

    getRecentlyAddedLocations(user): Observable<any> {
        return this.http.post('http://localhost/listeo-desktop/src/api/database/getRecentlyAddedLocations.php', user)
            .map(response => {
                this.hasResult = response;
                if (this.hasResult._body !== 'Not found') {
                    return response.json();
                }
                else {
                    return response.text();
                }
            });
    }

    getLastArticles(): Observable<any> {
        return this.http.get('http://localhost/listeo-desktop/src/api/database/getLastArticles.php')
            .map(response => {
                this.hasResult = response;
                if (this.hasResult._body !== 'Not found') {
                    return response.json();
                }
                else {
                    return response.text();
                }
            });
    }

    getAllActivatedRestaurants(userId): Observable<any> {
        return this.http.post('http://localhost/listeo-desktop/src/api/database/getAllActivatedRestaurants.php', userId)
            .map(response => {
                this.hasResult = response;
                if (this.hasResult._body !== 'Not found') {
                    return response.json();
                }
                else {
                    return response.text();
                }
            });
    }

    getRestaurantDetails(data) {
        return this.http.post('http://localhost/listeo-desktop/src/api/database/getRestaurantDetails.php', data)
            .map(response => {
                this.hasResult = response;
                if (this.hasResult._body !== 'Not found') {
                    return response.json();
                }
                else {
                    return response.text();
                }
            });
    }

    getAll() {
        return this.http.get('http://localhost/listeo-desktop/src/api/database/getAll.php')
            .map(response => {
                this.hasResult = response;
                if (this.hasResult._body !== 'Not found') {
                    return response.json();
                }
                else {
                    return response.text();
                }
            });
    }
}
