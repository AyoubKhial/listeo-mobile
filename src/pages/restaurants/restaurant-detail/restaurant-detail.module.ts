import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantDetailPage } from './restaurant-detail';
import { ChartsModule } from 'ng2-charts';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    RestaurantDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantDetailPage),
    ChartsModule,
    Ionic2RatingModule
  ],
})
export class RestaurantDetailPageModule {}
