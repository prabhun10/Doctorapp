import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MappagePage } from './mappage';

@NgModule({
  declarations: [
    MappagePage,
  ],
  imports: [
    IonicPageModule.forChild(MappagePage),
  ],
})
export class MappagePageModule {}
