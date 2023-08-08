import { Component } from '@angular/core'; 
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable'; 

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  serverurl: string = 'https://emawarith.com.my/';
  getdata:any;
  loginuser_id:any;
  data:any=[];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,public http:HttpClient,private storage: Storage,public loading: LoadingController) { 
    this.storage.get('pntid').then((val)=>{
      this.loginuser_id=val;
      this.getdatas(); 
    }); 
  }

  getdatas() { 
    let loader = this.loading.create({
      content: 'Processing. Please wait...',
    });
    loader.present();
    var url = this.serverurl+'drnowpatientapp/notification.php?id='+this.loginuser_id;   
    this.getdata = this.http.get(url);
    this.getdata.subscribe(hdata =>{  
      this.data = hdata; 
      loader.dismiss();  
    });  
  }

}
