import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 
//import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable'; 

import { MverifyPage } from '../mverify/mverify';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  serverurl: string = 'https://emawarith.com.my/';
  getdata:Observable<any>; 
  data:any=[];
  firstname:any;
  state:any;
  citydata:Observable<any>;
  statedata:Observable<any>;
  citytyperesult:any=[];
  statetyperesult:any=[];
  cityname:any=[];
  
  statename:any=[];
  

  constructor(public navCtrl: NavController,public modalController:ModalController, public viewCtrl : ViewController,public navParams: NavParams,public http:HttpClient) {
     
    this.getstate();
            
  }
  mverify(formValue:any) {  
    console.log(formValue);
    if (formValue.firstname == "" ) {
       alert(formValue.firstname);
      } 
      else {
      //if all fields are full
      }


    setTimeout(() => {
      let modal = this.modalController.create(MverifyPage, {fdata:formValue});
   modal.present();
   }, 300);
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
   


 
 

  checkstate(){
     
    var url = this.serverurl+'drnowpatientapp/getcity.php?stateid='+this.state;  
   // alert(url);
    this.citydata = this.http.get(url);
    this.citydata.subscribe(citydata =>{  
      this.citytyperesult = citydata;  
      this.cityname = this.citytyperesult;
     // alert(this.levatyperesult);
          console.log('city ',this.cityname);
     // console.log('logourl ',this.logourl);
           
    });

 
  }

  getstate(){

    var url = this.serverurl+'drnowpatientapp/getstate.php';  
     
    this.statedata = this.http.get(url);
    this.statedata.subscribe(statedata =>{  
      this.statetyperesult = statedata;  
      this.statename = this.statetyperesult;
      console.log('state ',this.cityname);
     
          //console.log('leave type ',this.cityname);
     // console.log('logourl ',this.logourl);
           
    });
  
     
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

 

}
