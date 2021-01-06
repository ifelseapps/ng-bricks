import { NgModule } from '@angular/core';
import { BricksComponent } from './bricks.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { ItemsListComponent } from './components/combobox/components/items-list/items-list.component';
import { ItemComponent } from './components/combobox/components/item/item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './components/combobox/pipes/filter.pipe';
import { ComboboxItemDirective } from './components/combobox/directives/combobox-item.directive';


@NgModule({
  declarations: [BricksComponent, ComboboxComponent, ItemsListComponent, ItemComponent, FilterPipe, ComboboxItemDirective],
  imports: [
    OverlayModule,
    CommonModule,
    A11yModule,
    ReactiveFormsModule
  ],
  exports: [BricksComponent, ComboboxComponent, ComboboxItemDirective]
})
export class BricksModule { }
