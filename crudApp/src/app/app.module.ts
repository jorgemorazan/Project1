import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Pipe } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDjqEz-qE4wyOqki1R6_NszRO-KeSQ99U4",
  authDomain: "project1ux-61b14.firebaseapp.com",
  databaseURL: "https://project1ux-61b14.firebaseio.com",
  projectId: "project1ux-61b14",
  storageBucket: "project1ux-61b14.appspot.com",
  messagingSenderId: "10445598911"
};

//Pipes
import {OrderByPipe} from '../app/pipes/mypipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
