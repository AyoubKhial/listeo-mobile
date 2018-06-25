import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../../providers/database/database';
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';

@IonicPage()
@Component({
    selector: 'page-restaurants',
    templateUrl: 'restaurants.html',
})
export class RestaurantsPage {

    public restaurants: any[];
    public filtredRestaurants: any[];
    private userId: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
        this.userId = 0;
    }

    ngOnInit() {
        if (localStorage.getItem("user") != null){
            this.userId = JSON.parse(localStorage.getItem("user"))[0].id;
        }
        this.getAllActivatedRestaurants();
    }

    getAllActivatedRestaurants() {
        this.databaseProvider.getAllActivatedRestaurants(this.userId).subscribe(res => {
            if (res != '0') {
                this.restaurants = res;
                this.filtredRestaurants = this.restaurants;
            }
            else {
                console.log("No article FOUND");
            }
        });
    }
    
    getRestaurants(ev: any) {
        this.filtredRestaurants = this.restaurants;
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.filtredRestaurants = this.filtredRestaurants.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    goToRestaurant(id){
        this.navCtrl.push(RestaurantDetailPage,{ id: id });
    }

    getStars(rating) {
        return { 'width': parseFloat(rating) / 5 * 100 + '%' };
    }
}
