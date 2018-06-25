import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription, Observable } from 'rxjs';
import { DatabaseProvider } from '../../providers/database/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@IonicPage()
@Component({
    selector: 'page-nearby',
    templateUrl: 'nearby.html',
})
export class NearbyPage implements OnInit, OnDestroy {

    private callMapScript: Subscription;
    public items =[];
    private unsubscribe = new Subject<void>();

    constructor(public navCtrl: NavController, public navParams: NavParams, public databaseProvider: DatabaseProvider) {
    }
    
    ngOnInit() {
        this.callMapScript = Observable.interval(500).subscribe((val) => {
            var loadMap = document.getElementById('loadMap3');
            loadMap.click();
            this.callMapScript.unsubscribe();
        });
        this.getAllLocations();
    }

    getAllLocations(){
        this.databaseProvider.getAllLocations().takeUntil(this.unsubscribe).subscribe(response => {
            if (response != 'Not found') {
                this.items.push(JSON.stringify(response))
            }
            else {
                console.log("No article FOUND");
            }
        })
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
