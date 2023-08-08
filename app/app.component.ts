import { Component,ViewChild } from '@angular/core';
import { Platform,ToastController,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient } from '@angular/common/http'; 
import { Storage } from '@ionic/storage';
import {  Nav } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { SocialSharing } from '@ionic-native/social-sharing'
import { Observable } from 'rxjs/Observable'; 
 



import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MverifyPage } from '../pages/mverify/mverify';
import { SignupPage } from '../pages/signup/signup';
import { AddcardPage } from '../pages/addcard/addcard';
import { MappagePage } from '../pages/mappage/mappage';
import { DoctorslistPage } from '../pages/doctorslist/doctorslist';
import { DctrrequestPage } from '../pages/dctrrequest/dctrrequest';
import { BookacallPage } from '../pages/bookacall/bookacall';
import { MybookingsPage } from '../pages/mybookings/mybookings';
import { NotificationPage } from '../pages/notification/notification';

   


@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage; 
  link:string='https://www.youtube.com/watch?v=sU-JdM5h0-k';
  serverurl: string = 'https://emawarith.com.my/';
  getdata:Observable<any>;
  data:any=[];
  devicetype:any;

  constructor(platform: Platform, private socialSharing: SocialSharing,public alertCtrl: AlertController, private push: Push, statusBar: StatusBar, public toastCtrl: ToastController,splashScreen: SplashScreen,public http:HttpClient,private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('ios')) this.devicetype='Iphone'; else  this.devicetype='android';
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushSetup();
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
    if (notification.message) {
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
            this.nav.push(NotificationPage, { message: notification.message, title: notification.title, image:notification.image });
          }
        }]
      });
      confirmAlert.present();
    } else {
      //if user NOT using app and push notification comes
      //TODO: Your logic on click of push notification directly
      this.nav.push(NotificationPage, { message: notification.message });
      console.log('Push notification clicked');
    }
   
  });
  
   
   pushObject.on('registration').subscribe((registration: any) =>{ 
    //alert(registration.registrationId);
    
    console.log('Device registered', registration)});
  
   
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }



  share(){
    var url = this.serverurl+'drnowpatientapp/sociallink.php?device='+this.devicetype;  
    this.getdata = this.http.get(url);
    this.getdata.subscribe(hdata =>{  
    this.data = hdata;  

    this.socialSharing.share(this.data.msg,'','',this.data.link)
    .then(()=>{

    }).catch(()=>{
  });
    });
  }









    homepage(){
      this.nav.push(MappagePage); 
    }

    mybooking(){
      this.nav.push(MybookingsPage); 
    }

  


    getnotify(){
      this.nav.push(NotificationPage);
    }
  logout() {
     
    // alert('dd');
    this.storage.clear().then(() => {
     console.log('all keys cleared');
   });
     this.storage.get('pntid').then((val)=>{  
       console.log('session ',val); 
  
     });
     let toast = this.toastCtrl.create({
      message: 'Logout Succesfully',
      duration: 3000,
      position: 'bottom',
      cssClass: 'changeToast'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
  toast.present();
  this.nav.push(LoginPage); 
  
  }
}

