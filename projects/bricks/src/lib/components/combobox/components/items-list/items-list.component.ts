import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { IItem } from '../../models/item';

@Component({
  selector: 'b-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  constructor() { }

  @Input()
  filteredItems: IItem[];

  @Input()
  items: IItem[];

  @Input()
  selected: IItem;

  /**
   * Событие вызывается при навигации по списку
   */
  @Output()
  changeActiveItem = new EventEmitter<IItem>();

  /**
   * Событие вызывается когда выбран конкретный элемент
   */
  @Output()
  selectItem = new EventEmitter<IItem>();

  @ViewChildren(ItemComponent)
  children: QueryList<ItemComponent>;

  private _keyManager: ActiveDescendantKeyManager<ItemComponent>;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initKeyManager();
  }

  ngOnChanges(): void {
    if (this._keyManager) {
      const [item] = this.filteredItems;
      const index = this.items.findIndex(i => i.value === item.value);
      this._keyManager.setActiveItem(index);
      this.onChangeActiveItem(item);
    }
  }

  ngOnDestroy(): void {
  }

  next(): void {
    this._keyManager.setNextItemActive();
    const item = this._keyManager.activeItem?.item;
    if (item) {
      this.onChangeActiveItem(item);
    }
  }

  prev(): void {
    this._keyManager.setPreviousItemActive();
    const item = this._keyManager.activeItem?.item;
    if (item) {
      this.onChangeActiveItem(item);
    }
  }

  onChangeActiveItem(item: IItem): void {
    this.changeActiveItem.emit(item);
  }

  onSelect(item: IItem): void {
    this.selectItem.emit(item);
  }

  private initKeyManager(): void {
    const index = this.selected ? this.items.findIndex(i => i.value === this.selected.value) : 0;
    this._keyManager = new ActiveDescendantKeyManager<ItemComponent>(this.children).withWrap();
    this._keyManager.setActiveItem(index);
    this.onChangeActiveItem(this.selected || this.filteredItems[0]);
  }
}
