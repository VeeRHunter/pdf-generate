import { ComponentsModule } from './../components/components.module';
import { AddTextPage } from './../pages/add-text/add-text';
import { ItemServiceProvider } from './../providers/item-service/item-service';
import { EditImagePage } from './../pages/edit-image/edit-image';
import { LoadingPage } from './../pages/loading/loading';
import { IntroSliderPage } from './../pages/intro-slider/intro-slider';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { AdmobServiceProvider } from '../providers/admob-service/admob-service';
import { AdMobFree } from '@ionic-native/admob-free';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroSliderPage,
    LoadingPage,
    EditImagePage,
    AddTextPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroSliderPage,
    LoadingPage,
    EditImagePage,
    AddTextPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImagePicker,
    FileOpener,
    File,
    ItemServiceProvider,
    DocumentViewer,
    AdMobFree,
    AdmobServiceProvider,
    Camera
  ]
})
export class AppModule {}
