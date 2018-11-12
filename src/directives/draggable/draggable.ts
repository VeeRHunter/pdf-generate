import { Directive ,Input,ElementRef,Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';


@Directive({
  selector: '[draggable]' // Attribute selector
})
export class DraggableDirective {

    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;
    @Input('drag') drag :boolean = true;

    constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {

    }

    ngAfterViewInit() {
      if(this.drag){
        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');

        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

        hammer.on('pan', (ev) => {
          this.handlePan(ev);
        });
      }


    }

    handlePan(ev){

        let newLeft = ev.center.x -50;
        let newTop = ev.center.y-100;

        this.domCtrl.write(() => {
            this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
            this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
        });

    }

}
