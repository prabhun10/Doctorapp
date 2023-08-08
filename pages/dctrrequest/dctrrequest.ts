import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable'; 
import { Storage } from '@ionic/storage';
import { MappagePage } from '../mappage/mappage';
;
/**
 * Generated class for the DctrrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dctrrequest',
  templateUrl: 'dctrrequest.html',
})
export class DctrrequestPage {
  drid:any;
  serverurl: string = 'https://emawarith.com.my/';
  drindvdetails:Observable<any>;
  drresult:any=[];
  dctinddetails:any=[];
  dctrid:any;
  dctrind_id:any;
  first_name:any;
  clinic_name:any;
  splname:any;
  qualification:any;
  experience:any;
  profileimg:any;
  dctr_prid:any;
  pntid:any=[];
  getdata:Observable<any>; 
  data:any=[];
  

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public viewCtrl : ViewController,public http:HttpClient,private storage: Storage) {
    this.drid = navParams.get('drid');  
    this.getdctrdetails();

    this.storage.get('pntid').then((val)=>{
      this.pntid=val;
      //alert(this.pntid);
      
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DctrrequestPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }





  getdctrdetails(){   
    
    var url = this.serverurl+'drnowpatientapp/getdoctordetails.php?dctrid='+this.drid; 
    console.log(url);
   // alert(this.http.get(url));
    this.drindvdetails = this.http.get(url);
    this.drindvdetails.subscribe(drindvdetails =>{  
      this.drresult = drindvdetails; 
      this.dctrind_id = this.drresult.id;
      this.first_name = this.drresult.first_name;
      this.clinic_name = this.drresult.clinic_name;
      this.splname = this.drresult.splname;
      this.qualification = this.drresult.qualification;
      this.experience = this.drresult.experience;
      this.profileimg = this.drresult.image;
       
         console.log('Doctor Indivdual Deatils',this.profileimg);
      
    })  
   
    
  }




  requestsend(dctr_prid){
    
    if(dctr_prid!=''){

      
      var url = this.serverurl+'drnowpatientapp/adddoctorrequest.php?user_id='+this.pntid+'&prefer_id='+dctr_prid;  
   
    this.getdata = this.http.get(url);
    this.getdata.subscribe(hdata =>{  
      this.data = hdata;  
      console.log('data response',this.data);
       
    }); 
     
      
    } 


    let alert = this.alertCtrl.create({
      title: 'Dr Now',
        subTitle: 'Concierge Request Sent Successfully',
       buttons: ['ok']
      });
      alert.present();
      
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
