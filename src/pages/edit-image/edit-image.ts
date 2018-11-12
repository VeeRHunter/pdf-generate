import { image } from './../../Interface/image';
import { Component } from '@angular/core';
import { NavParams,ViewController , AlertController  } from 'ionic-angular';



@Component({
  selector: 'page-edit-image',
  templateUrl: 'edit-image.html',
})
export class EditImagePage {

  public image : image;
  //Image Attribut
  public height:any = 100; // set default width
  public width:number = 100; //set default height
  public positionDirection:string = 'left'; // set deafault PositionDirection
  public margin:number = 10;


  constructor(public navParams: NavParams, public viewCtrl:ViewController,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
     const item = this.navParams.get('item');
     this.image = item;
     if(this.image.positionDirection) this.positionDirection = this.image.positionDirection;
     if(this.image.margin) this.margin = this.image.margin;
  }

  dismiss() {
    let data = this.image;
    this.viewCtrl.dismiss(data);
  }

  saveImage(){
    if(this.image.width == 'custom'){
        if(!this.width)
        {
          this.ShowErrors('Please enter a valid width number (px)');
          return ;
        } else {
          this.image.width = this.width + "px";
        }
    }

    if(this.image.height == 'custom' ){
      if(!this.height){
        this.ShowErrors('Please enter a valid height number (px)');
        return ;
      }
      else {
        this.image.height = this.height + "px";
      }
    }

    if(this.image.position != 'Auto'){
      this.image.positionDirection = this.positionDirection;
    }
    this.image.margin = this.margin;
    this.dismiss();

  }

  ShowErrors(message) {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: ['Retry']
    });
    alert.present();
  }
}
