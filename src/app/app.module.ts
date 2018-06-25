import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { BlogPage } from '../pages/blog/blog';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { firebaseConfig } from '../config';
import { RestaurantsPage } from '../pages/restaurant/restaurants/restaurants';
import { RestaurantDetailPage } from '../pages/restaurant/restaurant-detail/restaurant-detail';
import { ChartsModule } from 'ng2-charts';
import { Ionic2RatingModule } from 'ionic2-rating';
import { RestaurantHoursPage } from '../pages/restaurant/restaurant-hours/restaurant-hours';
import { RestaurantPhotosPage } from '../pages/restaurant/restaurant-photos/restaurant-photos';
import { RestaurantLocationPage } from '../pages/restaurant/restaurant-location/restaurant-location';
import { RestaurantDirectionsPage } from '../pages/restaurant/restaurant-directions/restaurant-directions';
import { RestaurantCommentsPage } from '../pages/restaurant/restaurant-comments/restaurant-comments';
import { NearbyPage } from '../pages/nearby/nearby';
import { ProfilePage } from '../pages/profile/profile';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        LogoutPage,
        BlogPage,
        RestaurantsPage,
        RestaurantDetailPage,
        RestaurantHoursPage,
        RestaurantPhotosPage,
        RestaurantLocationPage,
        RestaurantDirectionsPage,
        RestaurantCommentsPage,
        NearbyPage,
        ProfilePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig.fire),
        AngularFireAuthModule,
        ChartsModule,
        Ionic2RatingModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        LogoutPage,
        BlogPage,
        RestaurantsPage,
        RestaurantDetailPage,
        RestaurantHoursPage,
        RestaurantPhotosPage,
        RestaurantLocationPage,
        RestaurantDirectionsPage,
        RestaurantCommentsPage,
        NearbyPage,
        ProfilePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        DatabaseProvider,
        GooglePlus
    ]
})
export class AppModule { }
