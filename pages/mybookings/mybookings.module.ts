import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MybookingsPage } from './mybookings';

@NgModule({
  declarations: [
    MybookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MybookingsPage),
  ],
})
export class MybookingsPageModule {}
