import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userInformations;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("user") != null) 
        this.userInformations = JSON.parse(localStorage.getItem("user"))[0];
    
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  changeProfile(){

  }

}
