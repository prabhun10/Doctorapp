import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController,ToastController,AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable'; 
import { Storage } from '@ionic/storage';
import { MappagePage } from '../mappage/mappage';

/**
 * Generated class for the BookacallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookacall',
  templateUrl: 'bookacall.html',
})
export class BookacallPage {
  dr_ctrid:any;
  serverurl: string = 'https://emawarith.com.my/';
  prfid:any;
  drctdata:Observable<any>;
  result:any=[];
  dctrlistdata:any=[];
  getdata:Observable<any>; 
  data:any=[];
  formval:any;
  pntid:any=[];



  constructor(public navCtrl: NavController,public loading: LoadingController,public viewCtrl : ViewController,public navParams: NavParams,public http:HttpClient,public alertCtrl: AlertController,public toastCtrl: ToastController,private storage: Storage) {
    this.prfid = navParams.get('prfid'); 
    //this.prfid = '623';
    this.storage.get('pntid').then((val)=>{
      this.pntid=val;
    //  alert(this.pntid);
    });

    this.getdoctorcall();
     

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookacallPage');
  }

  getdoctorcall(){   
    
    var url = this.serverurl+'drnowpatientapp/getdoctorcalllist.php?dctrid='+this.prfid; 
    console.log(url);
   // alert(this.http.get(url));
    this.drctdata = this.http.get(url);
    this.drctdata.subscribe(drctdata =>{  
      this.result = drctdata; 
      this.dctrlistdata = this.result;
      //alert(this.dctrlistdata);
      //this.perundingjam = this.result['data2'];

 
      //this.empid= this.result['empdata'];
            console.log('Doctor book a cal',this.dctrlistdata);
      
    })  
   
    
  }

  addbook(formval:any){
    var url = this.serverurl+'drnowpatientapp/addbookcall.php?user_id='+this.pntid;         
      var postData=new FormData();     
      postData.append('formval',JSON.stringify(formval));
      this.getdata = this.http.post<any>(url, postData);         
        this.getdata.subscribe(httpdata =>{
          this.data = httpdata;  
          if(this.data.addbbok =='success'){ 
             
            let alert = this.alertCtrl.create({
              title: 'Kindly Wait For Information',
                subTitle: 'You will be notified in few minutes',
               buttons: ['close']
              });
              alert.present();    

        
          }
         
      
         
 


        this.navCtrl.setRoot(MappagePage);
      });  
   

  }

  
  public closeModal(){
    this.viewCtrl.dismiss();
  }



}
