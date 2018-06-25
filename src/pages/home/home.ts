import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { BlogPage } from '../blog/blog';
import { RestaurantsPage } from '../restaurant/restaurants/restaurants';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public topLocations: object;
    public recentLocations: object;
    private isLoggedIn: boolean;
    private userId: number;
    public articles: object;

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
        this.databaseService.getTopRatedLocations(user).subscribe(response => {
            this.topLocations = response;
        })
    }
    getRecentlyAddedLocations(){
        var user = null;
        if(this.isLoggedIn){
            user = this.userId;
        }
        this.databaseService.getRecentlyAddedLocations(user).subscribe(response => {
            this.recentLocations = response;
        })
    }

    getLastArticles() {
        this.databaseService.getLastArticles().subscribe(response => {
            for (var i = 0; i < response.length; i++) {
                response[i].texte = response[i].texte.replace(/(<([^>]+)>)/ig, "")
            }
            this.articles = response;
        });
    }

    goToBlog(){
        this.navCtrl.push(BlogPage)
    }

    goToRestaurants(){
        this.navCtrl.push(RestaurantsPage)
    }

    getStars(rating) {
        return { 'width': parseFloat(rating) / 5 * 100 + '%' };
    }
}
