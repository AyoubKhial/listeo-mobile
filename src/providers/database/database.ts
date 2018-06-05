import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseProvider {

    private hasResult: any;

    constructor(public http: Http) {
        console.log('Hello DatabaseProvider Provider');
    }

    getAllActivatedArticles(): Observable<any> {
        return this.http.get('https://listeo.000webhostapp.com/getAllActivatedArticles.php')
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
        return this.http.get('https://listeo.000webhostapp.com/checkAuth.php?email='+data.email+"&password="+data.password)
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
        return this.http.get('https://listeo.000webhostapp.com/registerWithGoogle.php?first_name='+data.first_name+"&last_name="+data.last_name+"&email="+data.email+"&password="+data.password+"&photo="+data.photo+"&phone="+data.phone)
            .map(res => {
               return res.text();
            });
    }
}
