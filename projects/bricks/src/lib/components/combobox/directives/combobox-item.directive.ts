import { Directive, TemplateRef } from '@angular/core';
import { IItem } from '../models/item';

@Directive({
  selector: '[bComboboxItem]'
})
export class ComboboxItemDirective {
  constructor(public templateRef: TemplateRef<IItem>) {
  }
}
