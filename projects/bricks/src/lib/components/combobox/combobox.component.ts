import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { IItem } from './models/item';
import { TemplatePortal } from '@angular/cdk/portal';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboboxItemDirective } from './directives/combobox-item.directive';
import { map } from 'rxjs/operators';
import { BricksOverlayRef } from '../../classes/bricks-overlay-ref';


const stringifyDefault = <T>(item: T): string => String(item);
const filterDefault = () => true;

@Component({
  selector: 'b-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true
    }
  ]
})
export class ComboboxComponent<T> implements OnInit, OnDestroy, ControlValueAccessor {
  constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) { }

  @Input()
  items: T[];

  @Input()
  stringify: (item: T) => string = stringifyDefault;

  @Input()
  getValue: (item: T) => string = stringifyDefault;

  @Input()
  filter: (item: T, phrase: string) => boolean = filterDefault;

  @Input()
  placeholder: string;

  @Input()
  searchPlaceholder: string;

  @Input()
  width = '100%';

  @Input()
  widthPopup: string | number = 300;

  @ViewChild('label', { static: true })
  labelRef: ElementRef<HTMLElement>;

  @ViewChild('popup', { static: true })
  popupRef: TemplateRef<any>;

  @ContentChild(ComboboxItemDirective, { static: true })
  itemTemplate: ComboboxItemDirective;

  selectedItem$ = new BehaviorSubject<IItem | null>(null);
  items$: Observable<IItem[]>;
  overlayRef: BricksOverlayRef;

  readonly searchField = new FormControl('');
  readonly isDisabled$ = new BehaviorSubject(false);

  private _activeItem: IItem | null = null;
  private _onTouch: () => void;
  private _onChange: (value: string) => void = () => {};

  ngOnInit(): void {
    this.initItems();
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.destroy();
    }
  }

  private initItems(): void {
    this.items$ = this.searchField.valueChanges
      .pipe(
        map((searchPhrase: string) => searchPhrase ? this.items.filter(item => this.filter(item, searchPhrase)) : this.items),
        map<T[], IItem[]>(items => items.map(item => this.createItem(item)))
      );
  }

  onFocus(): void {
    this._onTouch();
  }

  onChangeActiveItem(item: IItem): void {
    this._activeItem = item;
  }

  onSelect(item?: IItem): void {
    const currentItem = item || this._activeItem;
    if (currentItem) {
      this.setSelectedItem(currentItem);
      this._onChange(currentItem.value);
      this.closePopup();
    }
  }

  openPopup(): void {
    const isDisabled = this.isDisabled$.getValue();
    if (isDisabled) {
      return;
    }
    const ref = this._overlay.create(this.getOverlayConfig());
    this.overlayRef = BricksOverlayRef.create(ref);
    this.overlayRef.open(
      new TemplatePortal(this.popupRef, this._viewContainerRef),
      (overlayElement) => this.onAfterOpen(overlayElement)
    );
  }

  closePopup(): void {
    this.overlayRef.close(() => this.onAfterClose());
  }

  private onAfterOpen(overlayElement: HTMLElement): void {
    const searchInput = overlayElement.querySelector('input');
    if (searchInput) {
      this.searchField.setValue('');
      searchInput.focus();
    }
  }

  private onAfterClose(): void {
    this.labelRef.nativeElement.focus();
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this._overlay.position()
      .flexibleConnectedTo(this.labelRef.nativeElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        }
      ]);

    return new OverlayConfig({
      width: this.widthPopup,
      hasBackdrop: true,
      backdropClass: 'b-combobox-backdrop',
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled$.next(isDisabled);
  }

  writeValue(value: string): void {
    const item = this.items.find(i => this.getValue(i) === value);
    if (item) {
      this._onChange(value);
      this.setSelectedItem(this.createItem(item));
    }
  }

  private createItem(src: T): IItem {
    return {
      ...src,
      name: this.stringify(src),
      value: this.getValue(src),
    };
  }

  private setSelectedItem(item: IItem): void {
    this.selectedItem$.next(item);
  }
}
