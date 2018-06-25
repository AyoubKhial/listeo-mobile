import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs';

@IonicPage()
@Component({
    selector: 'page-restaurant-directions',
    templateUrl: 'restaurant-directions.html',
})
export class RestaurantDirectionsPage {

    private callMapScript: Subscription;
    public longitude;
    public latitude;
    public name: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInit() {
        this.longitude = this.navParams.get('longitude');
        this.latitude = this.navParams.get('latitude');
        this.name = this.navParams.get("name");
        this.callMapScript = Observable.interval(500).subscribe((val) => {
            var loadMap = document.getElementById('loadMap2');
            loadMap.click();
            this.callMapScript.unsubscribe();
        });
    }

}
