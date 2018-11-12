import { HomePage } from './../pages/home/home';
import { PdfBuilderPage } from './../pages/pdf-builder/pdf-builder';
import { IntroSliderPage } from './../pages/intro-slider/intro-slider';
import { LoadingPage } from './../pages/loading/loading';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoadingPage;

  pdfBuilderPage = PdfBuilderPage;
  HomePage = HomePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#f76f61');
      this.splashScreen.hide();
    });
  }

  IntroPage(){
    this.nav.setRoot(IntroSliderPage);
  }

  pusgPage(page){
    this.nav.push(page);
  }

}
