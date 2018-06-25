import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
    selector: 'page-logout',
    templateUrl: 'logout.html',
})
export class LogoutPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private gplus: GooglePlus) {
        localStorage.removeItem("user");
        this.navCtrl.setRoot(HomePage);
        this.gplus.logout();
        //web
        this.afAuth.auth.signOut();
        location.reload();
    }
}
