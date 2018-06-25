import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription, Observable } from 'rxjs';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the NearbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-nearby',
    templateUrl: 'nearby.html',
})
export class NearbyPage {

    private callMapScript: Subscription;
    public items =[];
    constructor(public navCtrl: NavController, public navParams: NavParams, public databaseProvider: DatabaseProvider) {
    }
    
    ngOnInit() {
        this.callMapScript = Observable.interval(500).subscribe((val) => {
            var loadMap = document.getElementById('loadMap3');
            loadMap.click();
            this.callMapScript.unsubscribe();
        });
        this.getAll();
    }

    getAll(){
        this.databaseProvider.getAll().subscribe(response => {
            this.items.push(JSON.stringify(response))
        })
    }
}
