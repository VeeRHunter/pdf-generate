import { item } from './../../Interface/item';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class ItemServiceProvider {


    public Items = new Subject();

    public getItems(){
      return this.Items;
    }

    private index =0;
    public addItem(el:item){
         el.id = this.index++;
        this.Items.next(el);//here i add new item
    }

}
