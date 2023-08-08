import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorslistPage } from './doctorslist';

@NgModule({
  declarations: [
    DoctorslistPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorslistPage),
  ],
})
export class DoctorslistPageModule {}
