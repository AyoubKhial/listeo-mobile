import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-logout',
    templateUrl: 'logout.html',
})
export class LogoutPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        localStorage.removeItem("user");
        this.navCtrl.setRoot(HomePage);
        location.reload()
    }
}

