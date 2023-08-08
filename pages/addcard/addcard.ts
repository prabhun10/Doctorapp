import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams,ViewController,AlertController,LoadingController,ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';  

import { LoginPage } from '../login/login';
import { exitCodeFromResult } from '@angular/compiler-cli';
import { MverifyPage } from '../mverify/mverify';
import { MappagePage } from '../mappage/mappage';



/**
 * Generated class for the AddcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcard',
  templateUrl: 'addcard.html',
})
export class AddcardPage {
  serverurl: string = 'https://emawarith.com.my/';
  getdata:Observable<any>; 
  data:any=[];
  formval:any;
  cardholdname:any;
  pid:any;

  constructor(public navCtrl: NavController,public modalController:ModalController,public loading: LoadingController,public toastCtrl: ToastController,public alertCtrl: AlertController,private storage: Storage, public navParams: NavParams,public http:HttpClient,public viewCtrl : ViewController) {
    
   this.pid = navParams.get('pid');  
    console.log(this.formval);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcardPage');
  }



  addcard(formval:any) {  
      var url = this.serverurl+'drnowpatientapp/addcard.php?id='+this.pid;         
      var postData=new FormData();     
      postData.append('formval',JSON.stringify(formval));
      this.getdata = this.http.post<any>(url, postData);         
        this.getdata.subscribe(httpdata =>{
          this.data = httpdata;  
          if(this.data.addcard =='success'){ 
            let loader = this.loading.create({
              content: 'Processing. Please wait...',
            });
            loader.present();
        loader.dismiss(); 
        let toast = this.toastCtrl.create({
          message: 'Card Details Added Succesfully',
          duration: 3000,
          position: 'bottom',
          cssClass: 'changeToast'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });


        toast.present();

          }
         
      
         
 


        this.navCtrl.setRoot(LoginPage);
      });  
   
   
  }


  skip(){
    this.navCtrl.setRoot(LoginPage);
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }


}
