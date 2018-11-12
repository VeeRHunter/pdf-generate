import { ItemServiceProvider } from './../../providers/item-service/item-service';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfBuilderPage } from './pdf-builder';

@NgModule({
  declarations: [
    PdfBuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(PdfBuilderPage),
    ComponentsModule
  ],
  providers:[ItemServiceProvider]
})
export class PdfBuilderPageModule {}
