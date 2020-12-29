import { NgModule } from '@angular/core';
import { BricksComponent } from './bricks.component';
import { ComboboxComponent } from './components/combobox/combobox.component';



@NgModule({
  declarations: [BricksComponent, ComboboxComponent],
  imports: [
  ],
  exports: [BricksComponent, ComboboxComponent]
})
export class BricksModule { }
