import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-restaurant-photos',
    templateUrl: 'restaurant-photos.html',
})
export class RestaurantPhotosPage implements OnInit {

    public name: string
    public photos;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInit(): void {
        this.name = this.navParams.get('name');
        this.photos = this.navParams.get('photos');
    }
}
