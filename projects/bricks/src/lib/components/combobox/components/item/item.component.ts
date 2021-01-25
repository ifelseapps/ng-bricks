import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { IItem } from '../../models/item';

@Component({
  selector: 'li[b-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ItemComponent implements Highlightable {
  constructor(private _cdr: ChangeDetectorRef, private _elementRef: ElementRef<HTMLLIElement>) { }

  @Input()
  item: IItem;

  private _active = false;

  @HostBinding('class.b-combobox-list-item-active')
  get active(): boolean {
    return this._active;
  }

  getLabel(): string {
    return this.item.name;
  }

  setActiveStyles(): void {
    this.setActive(true);
    this._elementRef.nativeElement.scrollIntoView({
      block: 'center'
    });
  }

  setInactiveStyles(): void {
    this.setActive(false);
  }

  private setActive(value: boolean): void {
    this._active = value;
    this._cdr.detectChanges();
  }
}
