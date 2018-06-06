import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public loginForm: FormGroup;
    public email: FormControl;
    public password: FormControl;
    public user: firebase.User;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertController: AlertController,
        public platform: Platform,
        public databaseProvider: DatabaseProvider,
        private afAuth: AngularFireAuth,
        private gplus: GooglePlus) {
            this.afAuth.authState.subscribe(user => this.user = user );
    }

    ngOnInit(): void {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9._-]*\\.[a-zA-Z]{2,4}$')
        ]);
        this.password = new FormControl('', [
            Validators.required
        ]);
    }

    createForm() {
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password
        });
    }

    checkAuth() {
        if (this.loginForm.valid) {
            this.databaseProvider.checkAuth(this.loginForm.value).subscribe(response => {
                if (response !== '0') {
                    localStorage.setItem("user", JSON.stringify(response))
                    console.log(JSON.stringify(response))
                    this.navCtrl.setRoot(HomePage);
                    location.reload()
                }
                else{
                    let alert = this.alertController.create({
                        title: "Login failed",
                        message: "Please check your credentials",
                        buttons: ["ok"]
                    });
                    alert.present();
                }
            });
        }
    }

    googleLogin() {
        if (this.platform.is('cordova')) {
            this.nativeGoogleLogin();
        } else {
            this.webGoogleLogin();
        }
    }

    async nativeGoogleLogin(): Promise<void> {
        const gplusUser = await this.gplus.login({
            'webClientId': '928528225593-iuhbsn1buj0j4hg2tgb2v89q2h4p9nh3.apps.googleusercontent.com',
            'offline': true,
            'scopes': 'profile email'
        })
        var firstName = this.user.displayName.split(' ').slice(0, -1).join(' ');
        var lastName = this.user.displayName.split(' ').slice(-1).join(' ');
        var user = [{
            'first_name': firstName,
            'last_name': lastName,
            'email': this.user.email,
            'phone': this.user.phoneNumber,
            'photo': this.user.photoURL,
            'password': this.user.uid,
            'name': "Oujda"
        }];
        this.databaseProvider.registerWithGoogle(user).subscribe(res => {
            console.log(res);
            localStorage.setItem("user", JSON.stringify(user));
            this.navCtrl.setRoot(HomePage);
            location.reload();
        })
        return await this.afAuth.auth.signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
        )
    }

    async webGoogleLogin(): Promise<void> {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const credential = await this.afAuth.auth.signInWithPopup(provider);
            var firstName = this.user.displayName.split(' ').slice(0, -1).join(' ');
            var lastName = this.user.displayName.split(' ').slice(-1).join(' ');
            var user = [{
                'first_name': firstName,
                'last_name': lastName,
                'email': this.user.email,
                'phone': this.user.phoneNumber,
                'photo': this.user.photoURL,
                'password': this.user.uid,
                'name': "Oujda"
            }];
            this.databaseProvider.registerWithGoogle(user).subscribe(res => {
                console.log(res);
                localStorage.setItem("user", JSON.stringify(user));
                this.navCtrl.setRoot(HomePage);
                location.reload();
            })
        } catch (err) {
            console.log(err)
        }
    }
}
