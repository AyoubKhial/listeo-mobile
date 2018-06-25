import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

    public userInformations;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInit(): void {
        if (localStorage.getItem("user") != null){
            this.userInformations = JSON.parse(localStorage.getItem("user"))[0];
        }
    }

    changeProfile() {

    }
}
