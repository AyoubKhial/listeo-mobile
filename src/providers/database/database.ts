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
        return this.http.get("http://localhost/listeo/src/api/database/mobile/getAllActivatedArticles.php")
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

    checkAuth(data): Observable<any> {
        return this.http.post("http://localhost/listeo/src/api/database/mobile/checkAuth.php", data)
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
}
