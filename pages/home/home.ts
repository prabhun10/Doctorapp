import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pntid:any=[];

  constructor(public navCtrl: NavController,private storage: Storage) {

    this.storage.get('pntid').then((val)=>{
      this.pntid=val;
    //  alert(this.pntid);
    });


  }

}
