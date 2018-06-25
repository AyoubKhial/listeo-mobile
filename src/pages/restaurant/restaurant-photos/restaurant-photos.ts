import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-restaurant-photos',
    templateUrl: 'restaurant-photos.html',
})
export class RestaurantPhotosPage {

    public name: string
    public photos;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInit(): void {
        this.name = this.navParams.get('name');
        this.photos = this.navParams.get('photos');
        console.log(this.photos)
    }
}
