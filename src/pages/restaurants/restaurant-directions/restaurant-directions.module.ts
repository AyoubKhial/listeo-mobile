import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantDirectionsPage } from './restaurant-directions';

@NgModule({
  declarations: [
    RestaurantDirectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantDirectionsPage),
  ],
})
export class RestaurantDirectionsPageModule {}
