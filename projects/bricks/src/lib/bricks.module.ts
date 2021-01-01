import { NgModule } from '@angular/core';
import { BricksComponent } from './bricks.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';


@NgModule({
  declarations: [BricksComponent, ComboboxComponent],
  imports: [
    OverlayModule,
    CommonModule,
    A11yModule
  ],
  exports: [BricksComponent, ComboboxComponent]
})
export class BricksModule { }
