import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { BlogPage } from '../blog/blog';
import { RestaurantsListingPage } from '../restaurants/restaurants-listing/restaurants-listing';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { HotelsListingPage } from '../hotels/hotels-listing/hotels-listing';
import { RestaurantDetailPage } from '../restaurants/restaurant-detail/restaurant-detail';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

    public topLocations: object;
    public recentLocations: object;
    private isLoggedIn: boolean;
    private userId: number;
    public articles: object;
    private unsubscribe = new Subject<void>();

    constructor(public navCtrl: NavController, private databaseService: DatabaseProvider) {
        this.isLoggedIn = false;
        this.userId = 0;
    }

    ngOnInit() {
        if (localStorage.getItem("user") != null){
            this.isLoggedIn = true;
            this.userId = JSON.parse(localStorage.getItem("user"))[0].id;
        }
        this.getTopRatedLocations();
        this.getRecentlyAddedLocations();
        this.getLastArticles();
    }

    getTopRatedLocations() {
        var user = null;
        if(this.isLoggedIn){
            user = this.userId;
        }
        this.databaseService.getTopRatedLocations(user).takeUntil(this.unsubscribe).subscribe(response => {
            if (response != 'Not found') {
                this.topLocations = response;
            }
            else {
                console.log("No item FOUND");
            }
        })
    }
    
    getRecentlyAddedLocations(){
        var user = null;
        if(this.isLoggedIn){
            user = this.userId;
        }
        this.databaseService.getRecentlyAddedLocations(user).takeUntil(this.unsubscribe).subscribe(response => {
            if (response != 'Not found') {
                this.recentLocations = response;
            }
            else {
                console.log("No item FOUND");
            }
        })
    }

    getLastArticles() {
        this.databaseService.getLastArticles().takeUntil(this.unsubscribe).subscribe(response => {
            if (response != 'Not found') {
                for (var i = 0; i < response.length; i++) {
                    response[i].texte = response[i].texte.replace(/(<([^>]+)>)/ig, "")
                }
                this.articles = response;
            }
            else {
                console.log("No article FOUND");
            }
        });
    }

    goToBlog(){
        this.navCtrl.push(BlogPage)
    }

    goToRestaurants(){
        this.navCtrl.push(RestaurantsListingPage)
    }

    goToHotels(){
        this.navCtrl.push(HotelsListingPage)
    }

    goToLocation(type, id){
        if(type == "restaurant"){
            this.navCtrl.push(RestaurantDetailPage,{ id: id });
        }
    }

    getStars(rating) {
        return { 'width': parseFloat(rating) / 5 * 100 + '%' };
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
