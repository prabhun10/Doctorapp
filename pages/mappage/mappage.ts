import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


import { DoctorslistPage } from '../doctorslist/doctorslist';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable'; 
import { BookacallPage } from '../bookacall/bookacall';
import { NotificationPage } from '../notification/notification';
 
/**

/**
 * Generated class for the MappagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mappage',
  templateUrl: 'mappage.html',
})
export class MappagePage {
  loginuser_id:any=[];
  serverurl: string = 'https://emawarith.com.my/';
  drid:any;
  drdt:Observable<any>;
  drlst:any=[];
  dctrind_id:any;
  drdata:Observable<any>;
  bkdata:Observable<any>;
  dctrlistdata:any=[];
  bklistdata:any=[];
  drcprfr_id:any;
  getnotifydata:any;
  regids:any;
  data:any=[];
  
   

  drindvdetails:Observable<any>;
  dctinddetails:any=[];
  result:any=[];
  bkresult:any=[];
  drhome: string = "concierge";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public push: Push, public modalController:ModalController,public navParams: NavParams,public http:HttpClient,private storage: Storage) {
    this.drhome = "concierge";
    this.storage.get('pntid').then((val)=>{
      this.loginuser_id=val;
      this.getdctrdetails();
      this.getbookingdetails(); 
      this.getnotify();     
      this.pushSetup(); 

     
      console.log('Login Session ID',this.loginuser_id);
    }); 
  }

  
pushSetup(){
  const options: PushOptions = {
    android: {
      senderID: '108542706392'

    },
    ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
    } 
 };
 


 
 const pushObject: PushObject = this.push.init(options);
 
 
 pushObject.on('notification').subscribe((notification: any) => 
 { 
  console.log('message -> ' + notification.message);
  //if user using app and push notification comes
  if (notification.title) {  

    // if application open, show popup
    let confirmAlert = this.alertCtrl.create({
      title: notification.title,  
      message: notification.message,
      buttons: [{
        text: 'Ignore',
        role: 'cancel'
      }, {
        text: 'View',
        handler: () => {
          //TODO: Your logic here
          this.navCtrl.push(NotificationPage, { message: notification.message, title: notification.title, subtitle: notification.subtitle });
        }
      }]
    });
    confirmAlert.present();
  } else {
    //if user NOT using app and push notification comes
    //TODO: Your logic on click of push notification directly
    this.navCtrl.push(NotificationPage, { message: notification.message });
    console.log('Push notification clicked');
  } 
 
});

 
 pushObject.on('registration').subscribe((registration: any) =>{ 
  //alert(registration.registrationId);

  var url = this.serverurl+'drnowpatientapp/pushnotiregid.php?id='+this.loginuser_id+'&tokenid='+registration.registrationId;      
    this.regids = this.http.get(url);
    this.regids.subscribe(regids =>{  
      this.regids = regids;   
    }); 
  
  console.log('Device registered', registration)});

 
 
 pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
}


presentNotifications(){
  this.navCtrl.setRoot(NotificationPage);
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MappagePage');
  }


  godoctr(){
    this.navCtrl.setRoot(DoctorslistPage);
  }

  getdctrdetails(){   
    
    var url = this.serverurl+'drnowpatientapp/getdoctor_request_status.php?pntid='+this.loginuser_id; 
    console.log(url);
   // alert(this.http.get(url));
   
   this.drdata = this.http.get(url);
   this.drdata.subscribe(drdata =>{  
     this.result = drdata; 
     this.dctrlistdata = this.result;
     //this.perundingjam = this.result['data2'];
     console.log('Docts',this.dctrlistdata);
     
      })  

      
  }



  getbookingdetails(){   
    
    var url = this.serverurl+'drnowpatientapp/getcurrentbooking.php?pntid='+this.loginuser_id; 
    console.log(url);
   // alert(this.http.get(url));
   
   this.bkdata = this.http.get(url);
   this.bkdata.subscribe(bkdata =>{  
     this.bkresult = bkdata; 
     this.bklistdata = this.bkresult;
     //this.perundingjam = this.result['data2'];
     console.log('Booking Details',this.bklistdata);
     
      })  

      
  }

  bookcall(drcprfr_id){
     
      
    setTimeout(() => {
      let modal = this.modalController.create(BookacallPage, {prfid:drcprfr_id});
   modal.present();
   }, 300);
    

     
  }



  getnotify() { 
     
    var url = this.serverurl+'drnowpatientapp/getnotifycount.php?id='+this.loginuser_id;   
    this.getnotifydata = this.http.get(url);
    this.getnotifydata.subscribe(hdata =>{  
      this.data = hdata.totcount; 
      console.log('Notify',this.data);
       
    });  
  }



   





}
