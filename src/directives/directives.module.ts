import { NgModule } from '@angular/core';
import { SelectionDirective } from './selection/Selection';
import { DraggableDirective } from './draggable/draggable';

@NgModule({
	declarations: [SelectionDirective,
    DraggableDirective],
	imports: [],
	exports: [SelectionDirective,
    DraggableDirective]
})
export class DirectivesModule {}
