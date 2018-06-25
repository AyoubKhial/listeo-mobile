import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs';
import { RestaurantDirectionsPage } from '../restaurant-directions/restaurant-directions';

@IonicPage()
@Component({
    selector: 'page-restaurant-location',
    templateUrl: 'restaurant-location.html',
})
export class RestaurantLocationPage {

    private callMapScript: Subscription;
    public longitude;
    public latitude;
    public name: string;
    public photo: string;
    public adresse: string;
    public rating: number;
    public number_reviews: number
    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ngOnInit() {
        this.longitude = this.navParams.get('longitude');
        this.latitude = this.navParams.get('latitude');
        this.name = this.navParams.get("name");
        this.photo = this.navParams.get('photo');
        this.adresse = this.navParams.get('adresse');
        this.rating = this.navParams.get("rating");
        this.number_reviews = this.navParams.get("number_reviews");
        this.callMapScript = Observable.interval(500).subscribe((val) => {
            var loadMap = document.getElementById('loadMap');
            loadMap.click();
            this.callMapScript.unsubscribe();
        });
    }

    getStars(rating) {
        return { 'width': parseFloat(rating) / 5 * 100 + '%' };
    }

    goToDirections(){
        this.navCtrl.push(RestaurantDirectionsPage, {
            name: this.name,
            longitude: this.longitude,
            latitude: this.latitude
        })
    }

}
