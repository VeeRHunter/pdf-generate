import { Directive, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Gesture } from 'ionic-angular/gestures/gesture';




@Directive({
  selector: '[selection]' // Attribute selector
})
export class SelectionDirective implements OnInit , OnDestroy {

  private el:HTMLElement;
  pressGesture: Gesture;
  @Output() deselectAll = new EventEmitter();


  constructor(
    public elem:ElementRef,
    public render: Renderer2
  ) {
     this.el = this.elem.nativeElement;
  }

  ngOnInit(){
    this.pressGesture = new Gesture(this.el);
    this.pressGesture.listen();
    this.pressGesture.on('press', (e :Event )=> {
      this.addClassImageOption();
    })
  }

  addClassImageOption(){
    this.el.classList.add('imageOption');
  }
  ngOnDestroy(){
    this.pressGesture.destroy();
  }

}
