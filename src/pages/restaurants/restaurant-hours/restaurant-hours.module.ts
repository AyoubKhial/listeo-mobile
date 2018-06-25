import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantHoursPage } from './restaurant-hours';

@NgModule({
  declarations: [
    RestaurantHoursPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantHoursPage),
  ],
})
export class RestaurantHoursPageModule {}
