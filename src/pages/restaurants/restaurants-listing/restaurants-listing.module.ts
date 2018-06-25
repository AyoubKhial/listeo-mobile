import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantsListingPage } from './restaurants-listing';

@NgModule({
  declarations: [
    RestaurantsListingPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantsListingPage),
  ],
})
export class RestaurantsListingPageModule {}
