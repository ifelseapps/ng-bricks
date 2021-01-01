import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'li[b-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ItemComponent implements OnInit, Highlightable {
  constructor(private _cdr: ChangeDetectorRef) { }

  private _active = false;

  @HostBinding('class.b-combobox-item-active')
  get active(): boolean {
    return this._active;
  }

  ngOnInit(): void {
  }

  setActiveStyles(): void {
    this.setActive(true);
  }

  setInactiveStyles(): void {
    this.setActive(false);
  }

  private setActive(value: boolean): void {
    this._active = value;
    this._cdr.detectChanges();
  }
}
