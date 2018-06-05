import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable'
import { DatabaseProvider } from '../../providers/database/database';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public loginForm: FormGroup;
    public email: FormControl;
    public password: FormControl;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertController: AlertController,
        public platform: Platform,
        public databaseProvider: DatabaseProvider) {
        
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
}
