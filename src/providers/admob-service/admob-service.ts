import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig ,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

@Injectable()
export class AdmobServiceProvider {

  private bannerId = '';//<-- Past your banner admob id here
  private InterstitialId = '';//<-- Past your Interstitial admob id here
  private VideoID = ''; //<-- Past your video admob id here


  public bannerConfig: AdMobFreeBannerConfig = {
      id:this.bannerId,
      autoShow: true,
      isTesting:false,//<- if you want just to test if admob is working , you can set the value to true
   };

   public InterstitialConfig : AdMobFreeInterstitialConfig = {
    id:this.InterstitialId,
     autoShow:true,
     isTesting:false,//<- if you want just to test if admob is working , you can set the value to true
   }

   public RewardVideoConfig : AdMobFreeRewardVideoConfig = {
    id:this.VideoID,
     autoShow : true,
     isTesting:false,//<- if you want just to test if admob is working , you can set the value to true
   }

  constructor(private admob:AdMobFree) {
    this.admob.banner.config(this.bannerConfig);
    this.admob.interstitial.config(this.InterstitialConfig);
    this.admob.rewardVideo.config(this.RewardVideoConfig);
  }

  public prepareBanner() {
    return this.admob.banner.prepare().then(()=>{
        console.log('banner success');
    }).catch((e)=>{
      console.log(JSON.stringify(e));
    })
  }

  public prepareInterstitial(){
      return this.admob.interstitial.prepare().then(()=>{
        console.log('Interstitial success');
      }).catch((e)=>{
        console.log(JSON.stringify(e));
      })
  }


  public prepareVideo(){
    return this.admob.rewardVideo.prepare().then(()=>{
      console.log('Video success');
    }).catch((e)=>{
      console.log(JSON.stringify(e));
    })
  }


}
