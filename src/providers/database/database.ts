import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

@Injectable()
export class DatabaseProvider {

    private hasResult: any;

    constructor(public http: Http, public platform: Platform) { }

    getAllActivatedArticles(): Observable<any> {
        return this.http.get("http://localhost/listeo-desktop/src/api/database/getAllActivatedArticles.php")
            .map(response => {
                this.hasResult = response;
                if (this.hasResult._body !== '0') {
                    return response.json();
                }
                else {
                    return response.text();
                }
            });
    }

    checkLoginCredentials(data): Observable<any> {
        return this.http.post("http://localhost/listeo-desktop/src/api/database/checkLoginCredentials.php", data)
            .map(response => {
                this.hasResult = response;
                if (this.hasResult._body !== '0') {
                    return response.json();
                }
                else {
                    return response.text();
                }
            });
    }

    registerWithGoogle(data): Observable<any> {
        return this.http.post("http://localhost/listeo/src/api/database/mobile/registerWithGoogle.php", data)
            .map(response => {
                return response.text();
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

    getAllLocations() {
        return this.http.get('http://localhost/listeo-desktop/src/api/database/getAllLocations.php')
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

    getAllActivatedHotels(userId): Observable<any> {
        return this.http.post('http://localhost/listeo-desktop/src/api/database/getAllActivatedHotels.php', userId)
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
