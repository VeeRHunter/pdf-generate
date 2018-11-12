import { DirectivesModule } from './../directives/directives.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ElementListComponent } from './element-list/element-list';
import {IonicModule } from 'ionic-angular';
import { ColorPickerComponent } from './color-picker/color-picker';

@NgModule({
	declarations: [ElementListComponent,
    ColorPickerComponent,],
  imports: [
            CommonModule,
            DirectivesModule,
            IonicModule
          ],
	exports: [
          ElementListComponent,
    ColorPickerComponent,
        ]
})
export class ComponentsModule {}
