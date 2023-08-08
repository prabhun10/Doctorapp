import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable'; 

/**
 * Generated class for the MybookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mybookings',
  templateUrl: 'mybookings.html',
})
export class MybookingsPage {
  drhome: string = "concierge";
  serverurl: string = 'https://emawarith.com.my/';
  passtdata:Observable<any>;
  resultpast:any=[];
  pastlistdata:any=[];
  loginuser_id:any=[];
  rejecttdata:Observable<any>;
  resultreject:any=[];
  rejectlistdata:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,private storage: Storage) {
    this.drhome = "concierge";

    this.storage.get('pntid').then((val)=>{
      this.loginuser_id=val;
      this.getpastdetails();
      this.getrejectdetails();
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookingsPage');
  }


  getpastdetails(){   
    
    var url = this.serverurl+'drnowpatientapp/getpastlist.php?pntid='+this.loginuser_id; 
    console.log(url);
   // alert(this.http.get(url));
   
   this.passtdata = this.http.get(url);
   this.passtdata.subscribe(passtdata =>{  
     this.resultpast = passtdata; 
     this.pastlistdata = this.resultpast;
     //this.perundingjam = this.result['data2'];
     console.log('Past Data',this.pastlistdata);
     
      })  

 
  }


  getrejectdetails(){   
    
    var url = this.serverurl+'drnowpatientapp/getrejectedlist.php?pntid='+this.loginuser_id; 
    console.log(url);
   // alert(this.http.get(url));
   
   this.rejecttdata = this.http.get(url);
   this.rejecttdata.subscribe(rejecttdata =>{  
     this.resultreject = rejecttdata; 
     this.rejectlistdata = this.resultreject;
     //this.perundingjam = this.result['data2'];
     console.log('Reject Data',this.rejectlistdata);
     
      })  

 
  }




}
 