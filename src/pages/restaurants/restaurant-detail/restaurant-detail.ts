import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../../providers/database/database';
import { RestaurantHoursPage } from '../restaurant-hours/restaurant-hours';
import { RestaurantPhotosPage } from '../restaurant-photos/restaurant-photos';
import { RestaurantLocationPage } from '../restaurant-location/restaurant-location';
import { RestaurantCommentsPage } from '../restaurant-comments/restaurant-comments';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@IonicPage()
@Component({
    selector: 'page-restaurant-detail',
    templateUrl: 'restaurant-detail.html',
})
export class RestaurantDetailPage implements OnInit, OnDestroy {

    private restaurantId: number;
    public restaurant;
    public userId: number;
    public isLoggedIn: boolean;
    public doughnutChartLabels: string[] = ['Excellent', 'Very good', 'Average', 'Poor', 'Terrible'];
    public doughnutChartData: number[];
    public doughnutChartColors: any[] = [{ backgroundColor: ["#64bc36", "#89e519", "#c0c52a", "#ee6464", "#ee3535"] }]
    public doughnutChartType: string = 'doughnut';
    public user;
    @ViewChild('ratingValue') ratingValue;
    private unsubscribe = new Subject<void>();

    constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
        this.userId = 0;
        this.isLoggedIn = false;
        this.doughnutChartData = [0, 0, 0, 0, 0]
    }

    ngOnInit(): void {
        this.restaurantId = this.navParams.get('id');
        if (localStorage.getItem("user") != null) {
            this.isLoggedIn = true;
            this.userId = JSON.parse(localStorage.getItem("user"))[0].id;
            this.user = JSON.parse(localStorage.getItem("user"))[0];
        }
        this.getRestaurantDetails();
    }

    getRestaurantDetails() {
        var data = {
            'restaurant': this.restaurantId,
            'user': null
        }
        if (this.isLoggedIn) {
            data.user = this.userId;
        }
        this.databaseProvider.getRestaurantDetails(data).takeUntil(this.unsubscribe).subscribe(response => {
            if (response != 'Not found') {
                this.restaurant = response[0];
                this.doughnutChartData = [
                    this.restaurant.ratings[1][0],
                    this.restaurant.ratings[1][1],
                    this.restaurant.ratings[1][2],
                    this.restaurant.ratings[1][3],
                    this.restaurant.ratings[1][4]
                ];
            }
        });
    }

    getStars(rating) {
        return { 'width': parseFloat(rating) / 5 * 100 + '%' };
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    getRatingValue(){
        console.log(this.ratingValue.innerValue)
    }

    goToHours(){
        this.navCtrl.push(RestaurantHoursPage, {
            name: this.restaurant.name,
            hours: this.restaurant.horaire
        })
    }

    goToPhotos(){
        this.navCtrl.push(RestaurantPhotosPage, {
            name: this.restaurant.name,
            photos: this.restaurant.photos
        })
    }

    goToLocation(){
        this.navCtrl.push(RestaurantLocationPage, {
            name: this.restaurant.name,
            longitude: this.restaurant.longitude,
            latitude: this.restaurant.latitude,
            photo: this.restaurant.main_photo,
            adresse: this.restaurant.adresse,
            rating: this.restaurant.rating,
            number_reviews: this.restaurant.number_reviews
        })
    }

    goToComments(){
        this.navCtrl.push(RestaurantCommentsPage, {
            name: this.restaurant.name,
            comments: this.restaurant.comments,
            number_comments: this.restaurant.number_comments
        })
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
