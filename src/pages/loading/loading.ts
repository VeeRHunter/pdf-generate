import { IntroSliderPage } from './../intro-slider/intro-slider';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
    //Check if this is the first apllication startup
    this.storage.get('ShowSlide').then((val)=>{
      if(val == true){
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.navCtrl.setRoot(IntroSliderPage);
      }
  })
  }

}
