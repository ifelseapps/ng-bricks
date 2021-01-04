import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { IItem } from '../../models/item';

@Component({
  selector: 'li[b-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ItemComponent implements OnInit, Highlightable {
  constructor(private _cdr: ChangeDetectorRef, private _elementRef: ElementRef<HTMLLIElement>) { }

  @Input()
  item: IItem;

  private _active = false;

  @HostBinding('class.b-combobox-item-active')
  get active(): boolean {
    return this._active;
  }

  ngOnInit(): void {
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

  getLabel(): string {
    return this.item.name;
  }

  private setActive(value: boolean): void {
    this._active = value;
    this._cdr.detectChanges();
  }
}
