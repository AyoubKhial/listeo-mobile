import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelsListingPage } from './hotels-listing';

@NgModule({
  declarations: [
    HotelsListingPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelsListingPage),
  ],
})
export class HotelsListingPageModule {}
