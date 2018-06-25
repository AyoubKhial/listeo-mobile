import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RestaurantCommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-restaurant-comments',
    templateUrl: 'restaurant-comments.html',
})
export class RestaurantCommentsPage {

    public comments;
    public number_comments: number;
    public name: string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInit() {
        this.name = this.navParams.get('name');
        this.comments = this.navParams.get('comments');
        this.number_comments = this.navParams.get("number_comments");
        console.log(this.comments)
    }

}
