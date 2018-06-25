import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { DatabaseProvider } from '../../../providers/database/database';

@IonicPage()
@Component({
    selector: 'page-hotels-listing',
    templateUrl: 'hotels-listing.html',
})
export class HotelsListingPage implements OnInit, OnDestroy {

    public hotels: any[];
    public filtredHotels: any[];
    private userId: number;
    private unsubscribe = new Subject<void>();

    constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    }

    ngOnInit() {
        if (localStorage.getItem("user") != null){
            this.userId = JSON.parse(localStorage.getItem("user"))[0].id;
        }
        this.getAllActivatedHotels();
    }

    getAllActivatedHotels() {
        this.databaseProvider.getAllActivatedHotels(this.userId).takeUntil(this.unsubscribe).subscribe(res => {
            if (res != 'Not found') {
                this.hotels = res;
                this.filtredHotels = this.hotels;
            }
            else {
                console.log("No hotels FOUND");
            }
        });
    }

    getHotels(ev: any) {
        this.filtredHotels = this.hotels;
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.filtredHotels = this.filtredHotels.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    goToHotel(id){
        //this.navCtrl.push(RestaurantDetailPage,{ id: id });
    }

    getStars(rating) {
        return { 'width': parseFloat(rating) / 5 * 100 + '%' };
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
