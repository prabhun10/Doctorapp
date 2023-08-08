import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable'; 
import { DctrrequestPage } from '../dctrrequest/dctrrequest';


/**
 * Generated class for the DoctorslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctorslist',
  templateUrl: 'doctorslist.html',
})
export class DoctorslistPage {
  pntid:any=[];
  serverurl: string = 'https://emawarith.com.my/';
  drdata:Observable<any>;
  result:any=[];
  dctrlistdata:any=[];
  dctrid:any;

  constructor(public navCtrl: NavController,public modalController:ModalController ,public navParams: NavParams,private storage: Storage,public http:HttpClient) {
    this.storage.get('pntid').then((val)=>{
      this.pntid=val;
      //alert(this.pntid);
      this.getdrlist();
    }); 

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorslistPage');
  }

  getdrlist(){   
    
    var url = this.serverurl+'drnowpatientapp/getdoctorlist.php?pntid='+this.pntid; 
    console.log(url);
   // alert(this.http.get(url));
    this.drdata = this.http.get(url);
    this.drdata.subscribe(drdata =>{  
      this.result = drdata; 
      this.dctrlistdata = this.result;
      //alert(this.dctrlistdata);
      //this.perundingjam = this.result['data2'];

 
      //this.empid= this.result['empdata'];
            console.log('Doctor Lists',this.dctrlistdata);
      
    })  
   
    
  }


  gotodctrreq(dctrid){
     

    setTimeout(() => {
      let modal = this.modalController.create(DctrrequestPage, {drid:dctrid});
   modal.present();
   }, 300);
  }
 

} 
  