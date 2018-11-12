import { text } from './../../Interface/text';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-add-text',
  templateUrl: 'add-text.html',
})
export class AddTextPage {

  width:number = 100;

  item : text = {
    text:'',
    color:'#012362',
    fontSize:20,
    type:'text',
    position:'absolute',
    width:'auto',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams ,private alertCtrl: AlertController ,public viewCtrl:ViewController) {
  }

  ionViewDidLoad(){
    if(this.navParams.get('edit'))
     {
      this.item = this.navParams.get('item');
     }
  }

  dismiss() {
    let data = this.item;
    this.viewCtrl.dismiss(data);
  }

  CloseEdit(){
    this.viewCtrl.dismiss();
  }
  addText(){
    if(!this.item.fontSize || !this.item.text){
      this.ShowErrors('Please Fill in all fields ')
      return;
    }
    if(this.item.width !='auto' ){
      if(!this.width){
        this.ShowErrors('Please Enter a valid width (px) ')
         return;
      }
      this.item.width = String(this.width);
    }

    this.dismiss();
  }

  ShowErrors(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['Retry']
    });
    alert.present();
  }

  changeColor(value){
    this.item.color= value;
  }

}
