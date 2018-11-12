import { SplashScreen } from '@ionic-native/splash-screen';
import { AdmobServiceProvider } from './../../providers/admob-service/admob-service';
import { AddTextPage } from './../add-text/add-text';
import { text } from './../../Interface/text';
import { image } from './../../Interface/image';
import { ItemServiceProvider } from './../../providers/item-service/item-service';
import { Component, Renderer2, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL, AlertController, LoadingController, ModalController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer , DocumentViewerOptions } from '@ionic-native/document-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova:any;

@IonicPage({
  name: 'PdfConverter-page',
})
@Component({
  selector: 'page-pdf-builder',
  templateUrl: 'pdf-builder.html',

})
export class PdfBuilderPage {


  imagesUrl: Array<string>   = [] // List of images file system URL;
  path: any; // Path where Pdf file will saved
  loading : any;
  fileName : any;
  showRemindAler : boolean = true;

  @ViewChild('fab') fab; //Select Fab button

 constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   private imgPicker: ImagePicker,
   private file: File,
   private pdfOpener : FileOpener,
   private alertCtrl: AlertController,
   private loadingCtrl: LoadingController,
   private ItemService : ItemServiceProvider,
   private renderer:Renderer2,
   private document: DocumentViewer,
   private modalCtrl:ModalController,
   private admobService:AdmobServiceProvider,
   private camera: Camera,
   private splashScreen:SplashScreen,
   private platform:Platform
 ) {
 }

 selectImage(){
   //Check if we have permission to get Image from gallery
   this.requestPermission().then((permission) =>{
          if(permission){
               //Display Ads
               this.admobService.prepareInterstitial()
               //Display Loading
              this.toggleLoading(true);
              const options = { maximumImagesCount : 5 ,  outputType : 0 , quality:50 }
              //empty array of Urls if there are a previos images In
              this.imagesUrl = [];
              //Get pictures
              this.imgPicker.getPictures(options).then((result)=>{
                for (var i = 0; i < result.length; i++) {
                    this.imagesUrl.push(result[i]);
                }
                //Generate Base64 from image file system URL
                this.generateBase64Image().then(()=>{
                  //hide Fab Button
                  this.fab.close();
                  //Hide Loading
                  this.toggleLoading(false);

                  //Show Reminder
                  if(this.showRemindAler) this.remindPressAndHold();

                });
              })
              .catch((error)=>{
                  //if any errors occurred during getting images
                  this.showErrors(error);
                })
          } else{
            //Recall Method if permission has denied at first

          }

   })

 }


 generateBase64Image(): Promise<any>{
   return new Promise((resolve) => {
         this.imagesUrl.forEach((el ,index)=> {
               let lastIndex = el.lastIndexOf('/');
               let length = el.length;
               let fileName = el.substring(lastIndex+1 , length);
               let path = el.replace('/'+fileName,"");
               this.file.readAsDataURL(path,fileName)
               .then((base64Data)=>{
                  
                 let base64imgData;
                 if (this.platform.is('ios'))
                     base64imgData = normalizeURL(base64Data);
                  else
                     base64imgData = base64Data
                     
                  let img: image = {
                    type : 'image',
                    base64: base64Data,
                    width: 'Auto',
                    height:'Auto',
                    position:'Auto',
                    margin:10
                  };
                  //Add Image to Item Service
                  this.ItemService.addItem(img);
               })
               .catch((error)=>{
                 console.log("Base 64" + JSON.stringify(error));
               })
           });
           resolve();
   })
 }

 addCameraPhoto(){
  const options: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  this.toggleLoading(true);
  this.camera.getPicture(options).then((base64Data)=>{
    let base64imgData;
    
    //If platform is IOS
    if (this.platform.is('ios'))
        base64imgData = normalizeURL(base64Data);
    else
         base64imgData = "data:image/jpeg;base64," + base64Data;
    
    let img: image = {
      type : 'image',
      base64: base64imgData,
      width: 'Auto',
      height:'Auto',
      position:'Auto',
      margin:10
    };
    //Add Image to Item Service
    this.ItemService.addItem(img);
    this.toggleLoading(false);
  })
 }

 addText(){
    this.admobService.prepareBanner();
    this.admobService.prepareInterstitial();
    let item : text;
    let addTextModal = this.modalCtrl.create(AddTextPage);
    addTextModal.onDidDismiss((data)=>{
      if(data){
        item = <text>data;
        this.ItemService.addItem(item);
        this.fab.close();
        this.admobService.prepareBanner();
      }
    })
    addTextModal.present();

 }



 generatePDF(){
   this.promptFileName().then(()=>{
      this.createPDF();
  }).catch(()=>console.log("rejected"));
 }

 createPDF(){
  this.generateHtml().then((htmlElem)=>{
    //Show loading
    this.displaySplashScreen(true);
    //Select Div Element we want to convertouterHTML;
    let data = '<html>'+ htmlElem.outerHTML +'</html>'

    //Option of PDF page , you can edit as you like (portrait or landscape)
    const options = {
                      data : data,
                      documentSize: "A4",
                      landscape: "portrait",
                      type: "base64"};
    //Sart Converting
    cordova.plugins.pdf.htmlToPDF(options,
      (success)=>{

                var base64str = success;
                // decode base64 string, remove space for IE compatibility
                var binary = atob(base64str.replace(/\s/g, ''));
                var len = binary.length;
                var buffer = new ArrayBuffer(len);
                var view = new Uint8Array(buffer);
                for (var i = 0; i < len; i++) {
                    view[i] = binary.charCodeAt(i);
                }

                // create the blob object with content-type "application/pdf"
                var blob = new Blob( [view], { type: "application/pdf" });


                if(this.platform.is('android')){
                  //Path where PDF will be saved in Android Devices
                  this.path =this.file.externalApplicationStorageDirectory + 'files/';
                }
                if(this.platform.is('ios')) {
                  //Path to IOS devices
                  this.path = this.file.documentsDirectory;
                }



                //This will throw if the file doesn't exist , so we create the PDF file
                this.file.writeFile(this.path,this.fileName,blob,{replace:true})
                .then((result) => {
                      //Open the created PDF file
                       this.pdfOpener.open(this.path + this.fileName, "application/pdf")
                       .then(()=> {
                           this.admobService.prepareVideo();  //Show video Ads
                           this.displaySplashScreen(false); //Hide Loading
                        })
                        .catch((error)=>{
                          this.showErrors("The PDF File was succesfuly created , but can't open it right now , please make sur that you have a PDF reader installed in your device ");
                          this.ViewDocument(this.path + this.fileName);
                        })
                })
                .catch((error)=> {
                    this.showErrors("Error while creating the PDF");
                });;
            });
    })
 }

ViewDocument(path){
  const options: DocumentViewerOptions = {
    title: 'My PDF'
  }
  this.document.viewDocument(path, 'application/pdf', options);
}


ViewPdf(){
    this.fileName="view.pdf";
    this.createPDF();
}


 promptFileName():Promise<boolean>{
    return new Promise((resolve , reject)=>{
      let alert = this.alertCtrl.create({
        title: 'Enter a PDF name',
        inputs: [
          {
            name: 'FileName',
            placeholder: 'File name'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
             reject();
            }
          },
          {
            text: 'Create',
            handler: data => {
              //check if file with the same name already exist
              this.fileName = data.FileName +".pdf";
              this.file.checkFile(this.path,this.fileName)
              .then(() => {
                 //if file exist , Prompt Alert to user if he want to replace the file
                //  this.showErrors("a PDF file with the same name already exists, please try to change the name file ")
                  let alertExist = this.alertCtrl.create({
                    title:"a file with the same name already exists, would you like to overwrite it?",
                    buttons:[
                      {
                        text:"Replace",
                        handler : ()=>{
                          resolve(true);
                        }
                      },{
                        text:"Cancel",
                        role: 'cancel',
                        handler: data => {
                          reject();
                         }
                      }
                    ]
                  })
                  alertExist.present();
                })
                .catch(()=>{
                  //This will throw if file doesn't exit
                  resolve(true);
                });
            },
         }
        ]
      });
      alert.present();
    });

 }

 requestPermission(): Promise<boolean>{
   return new Promise((resolve)=>{
        this.imgPicker.hasReadPermission().then((permission)=>{
          if(permission == false){
              //Request Permission if the result is false
              this.imgPicker.requestReadPermission().then(()=>{
                resolve(false);
              })
              .catch((error)=>{
                //if permission is denied show error and return false
                this.showErrors(error);
                resolve(false);
              });
          }
          else{
            resolve(true);
          }
      })
   })
 }



generateHtml():Promise<HTMLElement>{
      return new Promise((resolve)=>{
          //Create Reference To Div that we want to convert
          let htmlTarget = this.renderer.createElement("div");
           //Select Div Element we want to conver
          htmlTarget.innerHTML  =  document.getElementsByTagName("element-list")[0].outerHTML;
          this.deleteHtmlElement('button',htmlTarget);
          this.deleteHtmlElement('.edit-imageOption',htmlTarget);
          this.deleteHtmlElement('.text-option',htmlTarget);
          this.setImageAttribut("img",<HTMLElement>htmlTarget);
         this.setTextAttribut(htmlTarget);
          resolve(htmlTarget);
      })
}

setTextAttribut(target:HTMLElement){
  const deviceWidth = window.innerWidth;
  Array.from(target.querySelectorAll('.popover')).forEach((element:HTMLElement)=>{
      element.style.fontSize = String(Number(element.dataset.fontsize) + 20 )+ "px";
      element.style.fontWeight= "bold";
      let left = element.style.left.replace('px','');
      element.style.left = String((755 * Number(left)) / deviceWidth) +'px';
      element.style.zIndex="100";
  });
}

setImageAttribut(elem:string,target:HTMLElement){
        Array.from(target.querySelectorAll(elem)).forEach((element:HTMLElement)=> {

            //Fix image width and Height
            element.style.maxWidth="100%";
            element.style.maxHeight="100%";
            element.style.marginTop = element.dataset.margin +"px";

            switch (element.dataset.width) {
              case 'Auto': element.style.width = "auto"; break;
              case 'FullPage': element.style.width = "100%"; break;
              default:
                element.style.width  = element.dataset.width;
                break;
            }
            switch (element.dataset.height) {
              case 'Auto': element.style.height = "auto"; break;
              case 'FullPage': element.style.height = "97vh"; break;
              default:
                element.style.height  = element.dataset.height;
                break;
            }

            switch (element.dataset.position) {
              case 'Auto': element.style.position = "static"; break;
              default:
                element.style.position  = "absolute";
                console.log(element.dataset.positiondirection);
                if(element.dataset.positiondirection == 'center'){
                  element.style.margin ="auto";
                  element.style.left="0";
                  element.style.right="0";
                } else{
                  element.style[element.dataset.positiondirection]="0";
                }
                break;
            }

           let itemWrapper = <HTMLElement> target.getElementsByClassName("item-wrapper")[0];
           itemWrapper.style.position="relative";
      });
}

deleteHtmlElement(elem:string,target:Element){

  Array.from(target.querySelectorAll(elem)).forEach(element => {
      element.parentNode.removeChild(element);
  });;
}

remindPressAndHold(){
  const alert = this.alertCtrl.create({
    cssClass : "holdAndPress",
    subTitle:`Press and Hold to edit image properties <img src='assets/imgs/holdAndPress.gif'>`,
    inputs:[{
      name:'holdcheck' ,
      type:'checkbox',
      label:'Never remind me again',
      checked:true,
    }],
    buttons:[
      {
        text:"OK",
        handler: data => {
        this.showRemindAler = false;
        }
      }
    ]
  })
  alert.present();
}

 showErrors(error){
   this.displaySplashScreen(false);
   let alert = this.alertCtrl.create({
     title : "An error has occurred",
     subTitle : "Error Message : " + JSON.stringify(error),
     buttons: ['OK']
   })
   alert.present();
 }

 toggleLoading(load:boolean){
     if(load) {
        this.loading = this.loadingCtrl.create({
          content:" Please wait ....",
        })
        this.loading.present();
     }
     else {
        this.loading.dismissAll();
     }
}

displaySplashScreen(display){
    if(display) this.splashScreen.show();
    else this.splashScreen.hide();
}

}
