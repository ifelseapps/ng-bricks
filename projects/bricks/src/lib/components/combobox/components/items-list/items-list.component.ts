import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'b-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent implements OnInit, AfterViewInit {
  constructor(private _cdr: ChangeDetectorRef) { }

  @Input()
  items: string[];

  @ViewChildren(ItemComponent)
  children: QueryList<ItemComponent>;

  private _keyManager: ActiveDescendantKeyManager<ItemComponent>;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initKeyManager();
  }

  next(): void {
    this._keyManager.setNextItemActive();
    this._cdr.detectChanges();
  }

  prev(): void {
    this._keyManager.setPreviousItemActive();
    this._cdr.detectChanges();
  }

  private initKeyManager(): void {
    this._keyManager = new ActiveDescendantKeyManager<ItemComponent>(this.children).withWrap();
    this._keyManager.setFirstItemActive();
    this._cdr.detectChanges();
  }
}
