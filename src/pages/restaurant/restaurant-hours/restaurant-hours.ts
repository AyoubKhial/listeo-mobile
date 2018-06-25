import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RestaurantHoursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-restaurant-hours',
    templateUrl: 'restaurant-hours.html',
})
export class RestaurantHoursPage {

    public name: string
    public hours;
    public today: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ngOnInit(): void {
        this.name = this.navParams.get('name');
        this.hours = this.navParams.get('hours');
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        this.today = weekday[d.getDay()];
        this.today = this.today.charAt(0).toLowerCase() + this.today.slice(1);
    }

}
