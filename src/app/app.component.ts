import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { BlogPage } from '../pages/blog/blog';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    auth: boolean;
    rootPage: any = HomePage;
    activePage: any;
    pages: Array<{ title: string, component?: any, icon: string, fontAwesome: boolean }>;
    ifAuth: Array<{ title: string, component?: any, icon: string, fontAwesome: boolean }>;
    ifGuest: Array<{ title: string, component?: any, icon: string, fontAwesome: boolean }>;
    userInformations;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();
        this.pages = [
            { title: 'Home', component: HomePage, icon: 'home', fontAwesome: false },
            { title: 'Restaurants', component: null, icon: 'pizza', fontAwesome: false },
            { title: 'Hotels', component: null, icon: 'bed', fontAwesome: true },
            { title: 'Blog', component: BlogPage, icon: 'logo-rss', fontAwesome: false },
            { title: 'Nearby', component: null, icon: 'map-marker', fontAwesome: true },
            { title: 'About', component: null, icon: 'information-circle', fontAwesome: false },
        ];
        this.ifAuth = [
            { title: 'Messages', component: null, icon: 'mail', fontAwesome: false },
            { title: 'Logout', component: LogoutPage, icon: 'sign-out', fontAwesome: true },
            { title: 'Profile', component: null, icon: 'contact', fontAwesome: false },
            { title: 'Favorites', component: null, icon: 'heart', fontAwesome: false }
        ];
        this.ifGuest = [
            { title: 'Login', component: LoginPage, icon: 'sign-in', fontAwesome: true }
        ]
        this.activePage = this.pages[0];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit(): void {
        if (localStorage.getItem("user") != null) {
            this.auth = true;
            this.userInformations = JSON.parse(localStorage.getItem("user"))[0];
            for (var i = 0; i < this.ifAuth.length; i++) {
                this.pages.push(this.ifAuth[i]);
            }
        }
        else {
            this.auth = false;
            for (var j = 0; j < this.ifGuest.length; j++) {
                this.pages.push(this.ifGuest[j]);
            }
        }
    }

    openPage(page) {
        this.nav.setRoot(page.component);
        this.activePage = page;
    }

    checkActive(page) {
        return page == this.activePage
    }
}
