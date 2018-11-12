import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { AdmobServiceProvider } from './../../providers/admob-service/admob-service';

import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  latestConvertion : Array<any> = [];
  path;
  constructor(
    public navCtrl: NavController,
    public AdmobServiceProvider:AdmobServiceProvider,
    private file:File,
    private FileOpener:FileOpener,
    private platform:Platform) {
  }

  ionViewWillEnter(){
      this.latestConvertion = [];
      //Path where PDF will be saved in Android Devices
      if(this.platform.is('android')) {
          this.path =this.file.externalApplicationStorageDirectory;
          this.file.listDir(this.path,'files').then((files:any) =>{
            files.map((val)=>{
                  if(val.isFile ){
                    this.latestConvertion.unshift({
                      name: val.name,
                      path : val.nativeURL
                    });
              }
            })
          }).catch(error=> console.log(JSON.stringify(error)));
      }
      //Path where PDF will be saved in IOS Devices
      else if(this.platform.is('ios')) {
        this.path = this.file.documentsDirectory;
        this.file.listDir(this.path,'').then((files:any) =>{
          files.map((val)=>{
                if(val.isFile ){
                  this.latestConvertion.unshift({
                    name: val.name,
                    path : val.nativeURL
                  });
            }
          })
        }).catch(error=> console.log(JSON.stringify(error)));
      }

  }

  openPdf(path){
    this.FileOpener.open(path,"application/pdf")
    .then(()=> this.AdmobServiceProvider.prepareVideo() )
    .catch((error)=>{
      console.log(JSON.stringify(error));
    });
  }
  pushPage(){
    this.navCtrl.push('PdfConverter-page');
    this.AdmobServiceProvider.prepareBanner();
  }
}
