import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
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
export class ItemsListComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private _cdr: ChangeDetectorRef) { }

  @Input()
  items: IItem[];

  @Input()
  selected: IItem;

  @Input()
  searchPhrase: string;

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
    this.children.changes.subscribe((children: QueryList<ItemComponent>) => {
      if (!children.first) {
        return;
      }
      const item = this.selected ? children.find(c => c.item.value === this.selected.value) || children.first : children.first;
      this._keyManager.setActiveItem(item);
      this.onChangeActiveItem(item.item);
      this._cdr.detectChanges();
    });

    this._keyManager = new ActiveDescendantKeyManager<ItemComponent>(this.children).withWrap();
    this.onChangeActiveItem(this.selected || this.items[0]);
    if (this.selected) {
      const item = this.children.find(c => c.item.value === this.selected.value) || this.children.first;
      this._keyManager.setActiveItem(item);
      return;
    }
    this._keyManager.setFirstItemActive();
  }
}
