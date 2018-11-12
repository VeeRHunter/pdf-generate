import { AddTextPage } from './../../pages/add-text/add-text';
import { item } from './../../Interface/item';
import { EditImagePage } from './../../pages/edit-image/edit-image';
import { ItemServiceProvider } from './../../providers/item-service/item-service';
import { Component, ElementRef, OnInit, ViewChildren ,QueryList } from '@angular/core';
import { ModalController , Gesture } from 'ionic-angular';

@Component({
  selector: 'element-list',
  templateUrl: 'element-list.html',
})
export class ElementListComponent  implements OnInit{

  items : Array<item> = [];
  @ViewChildren('imgWrapper') $imgWrapper: QueryList<any>;

  private el:HTMLElement;
  private pressGesture: Gesture;
  public maxTextSize : number = 50;

  constructor(public itemService : ItemServiceProvider,public modalCtrl: ModalController,public elem:ElementRef,) {
    this.el = this.elem.nativeElement;
  }
  ngOnInit(){
      //Subscribe to ItemService
      this.itemService.getItems().subscribe((val)=>{
        this.items.push(val);
      })

     // Deselect all items if user click on
      this.pressGesture = new Gesture(this.el);
      this.pressGesture.listen();
      this.pressGesture.on('tap',(e:Event)=>{
        let target= <HTMLImageElement>event.target;
        if( target.tagName.toLowerCase() != 'button' && target.tagName.toLowerCase() != 'ion-icon'){
            this.DeselectAllElement();
          }
       })
  }


  deleteImage(index){
    this.items.splice(index,1);
  }

  DeselectAllElement(){
    this.$imgWrapper.forEach(element => {
       element.nativeElement.classList.remove('imageOption')
    });
  }

  editImage(item) {
    let modal = this.modalCtrl.create(EditImagePage,{item :item });
    modal.onDidDismiss(data => {
      this.items.map((val)=>{
          if(val.id == data.id){
            val = data;
          }
      });
    });
    modal.present();
  }

  showEditText(item:HTMLElement){
    item.classList.toggle('showTextOption');
  }

  deleteText(item:HTMLElement){
    item.parentNode.removeChild(item)
  }

  editText(item : item){
    let addTextModal = this.modalCtrl.create(AddTextPage,{edit:true,item:item});
    addTextModal.onDidDismiss((data)=>{
        if(data){
          this.items.map((val)=>{
            if(val.id == data.id){
              val = data;
            }
        });
        }
    })
    addTextModal.present();
  }
}
