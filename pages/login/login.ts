import { Component } from '@angular/core';
import { IonicPage, NavController,  ModalController,NavParams, LoadingController, ToastController, AlertController  } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable'; 
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MappagePage } from '../mappage/mappage';
 
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  serverurl: string = 'https://emawarith.com.my/';
  getdata:Observable<any>; 
  data:any=[];
  pntid:any=[];
  username:string;
  password:string; 
  sessionid:any;

  constructor(public navCtrl: NavController, public modalController:ModalController, public alertCtrl: AlertController, public toastCtrl: ToastController, private storage: Storage, public loading: LoadingController,public pt: Platform, public http:HttpClient) {
      
      

    this.storage.get('pntid').then((val)=>{  
      this.sessionid=val;
      if(val) {
        this.navCtrl.setRoot(MappagePage);   
          
      
      } 
      
    });

  }


  login() {  
    let loader = this.loading.create({
      content: 'Processing. Please wait...',
    });
    loader.present();
    var url = this.serverurl+'drnowpatientapp/getlogin.php?un='+this.username+'&pwd='+this.password;  
   
    this.getdata = this.http.get(url);
    this.getdata.subscribe(hdata =>{  
      this.data = hdata;  
      loader.dismiss(); 
      if(this.data.login =='success'){ 
         
        this.storage.set('keyOfData', JSON.stringify(this.data)); 
    
        this.storage.set('pntid',this.data.id);   
        let toast = this.toastCtrl.create({
          message:  this.data.login_msg,
          duration: 3000,
          position: 'bottom',
          cssClass: 'toastSuccess'
        }); 
        toast.present();

       

        this.navCtrl.push(MappagePage);
      }else{
        let toast = this.toastCtrl.create({
          message:  this.data.login_msg,
          duration: 3000,
          position: 'bottom',
          cssClass: 'toastError'
        }); 
        toast.present();
        this.navCtrl.setRoot(this.navCtrl.getActive().component); 
      }
    }); 
     
  }

   

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup(){
    setTimeout(() => {
      let modal = this.modalController.create(SignupPage);
   modal.present();
   }, 300);
  }

}
