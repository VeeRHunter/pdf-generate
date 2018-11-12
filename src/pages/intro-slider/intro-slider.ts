import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-intro-slider',
  templateUrl: 'intro-slider.html',
})
export class IntroSliderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }

  completeSlider(){
    //Compelte The Slider display, So next time when apps start , slider will not show
    this.storage.set('ShowSlide',true);
    this.navCtrl.setRoot(HomePage);
  }
}
