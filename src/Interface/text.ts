import { item } from './item';

export interface text extends item{
     type:'text',
     text:string,
     fontSize : number,
     color:string,
     position:string;
     width:string;
}
