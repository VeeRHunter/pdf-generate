import { item } from './item';

export interface image extends item{
      type:'image',
      base64:string,
      width : any,
      margin?:number,
      height : any,
      position: any;
      positionDirection?:any;
}
