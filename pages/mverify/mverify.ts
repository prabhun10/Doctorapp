import { Component } from '@angular/core';  
import { IonicPage, NavController, NavParams,ModalController, AlertController,ViewController,LoadingController,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 
//import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable'; 
import { Platform } from 'ionic-angular'; 

import { LoginPage } from '../login/login';
import { AddcardPage } from '../addcard/addcard';


@IonicPage()
@Component({
  selector: 'page-mverify',
  templateUrl: 'mverify.html',
})
export class MverifyPage {
  serverurl: string = 'https://emawarith.com.my/';
  getdata:Observable<any>; 
  data:any=[];
  formval:any;
  mcode:any;
  pid:any;
  devicetype:any;

  constructor(public navCtrl: NavController,public pt: Platform,public modalController:ModalController,public alertCtrl: AlertController, public navParams: NavParams,  public loading: LoadingController,public viewCtrl : ViewController, public toastCtrl: ToastController,public http:HttpClient) {
    if (this.pt.is('ios')) this.devicetype='Iphone'; else  this.devicetype='android';
    this.formval = navParams.get('fdata');  
    console.log(this.formval);
  }

  verify() { 
    if(this.mcode=='123456'){
      var url = this.serverurl+'drnowpatientapp/signup.php';  
     // alert(url);
      var postData=new FormData();
      postData.append('devicetype',this.devicetype);
      postData.append('formval',JSON.stringify(this.formval));
      this.getdata = this.http.post<any>(url, postData);
      this.getdata.subscribe(httpdata =>{
        this.data = httpdata;  
        this.pid=this.data.id;
        let loader = this.loading.create({
          content: 'Processing. Please wait...',
        });
        
        loader.present();
        loader.dismiss(); 
        let toast = this.toastCtrl.create({
          message: 'Registered Succesfully',
          duration: 3000,
          position: 'bottom',
          cssClass: 'changeToast'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });


        toast.present();
         
          setTimeout(() => {
            let modal = this.modalController.create(AddcardPage, {pid:this.pid});
         modal.present();
         }, 300);
   


        //this.navCtrl.setRoot(LoginPage);
      });  
    }else{

      let alert = this.alertCtrl.create({
        title: 'Wrong code',
        subTitle: 'Type correct verification code',
        buttons: ['ok']
      });
      alert.present();
      //alert('Wrong code');
      this.mcode='';
    }
   
  }

}
