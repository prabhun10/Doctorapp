import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';
import { Push } from '@ionic-native/push';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MverifyPage } from '../pages/mverify/mverify';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AddcardPage } from '../pages/addcard/addcard';
import { MappagePage } from '../pages/mappage/mappage';
import { DoctorslistPage } from '../pages/doctorslist/doctorslist';
import { DctrrequestPage } from '../pages/dctrrequest/dctrrequest';
import { BookacallPage } from '../pages/bookacall/bookacall';
import { MybookingsPage } from '../pages/mybookings/mybookings';
import { NotificationPage } from '../pages/notification/notification';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    MverifyPage,
    AddcardPage,
    MappagePage,
    DoctorslistPage,
    DctrrequestPage,
    BookacallPage,
    MybookingsPage,
    NotificationPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    MverifyPage,
    AddcardPage,
    MappagePage,
    DoctorslistPage,
    DctrrequestPage,
    BookacallPage,
    MybookingsPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
