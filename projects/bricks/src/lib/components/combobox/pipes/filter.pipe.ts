import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../models/item';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: IItem[], field: keyof IItem, value: string): IItem[] {
    return items.filter(i => i[field].toLowerCase().includes(value.trim().toLowerCase()));
  }

}
