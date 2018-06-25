import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantCommentsPage } from './restaurant-comments';

@NgModule({
  declarations: [
    RestaurantCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantCommentsPage),
  ],
})
export class RestaurantCommentsPageModule {}
