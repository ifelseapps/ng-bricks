import { NgModule } from '@angular/core';
import { BricksComponent } from './bricks.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [BricksComponent, ComboboxComponent],
  imports: [
    OverlayModule,
    CommonModule
  ],
  exports: [BricksComponent, ComboboxComponent]
})
export class BricksModule { }
