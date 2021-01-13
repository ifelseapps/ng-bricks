import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ContentChild,
  ElementRef,
  EventEmitter, forwardRef, HostBinding, Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { IItem } from './models/item';
import { TemplatePortal } from '@angular/cdk/portal';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboboxItemDirective } from './directives/combobox-item.directive';

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
export class ComboboxComponent implements OnInit, OnDestroy, ControlValueAccessor {
  constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) { }

  @Input()
  items: IItem[];

  @Input()
  placeholder: string;

  @Input()
  searchPlaceholder: string;

  @Input()
  width: string;

  @ViewChild('label', { static: true })
  labelRef: ElementRef<HTMLElement>;

  @ViewChild('popup', { static: true })
  popupRef: TemplateRef<any>;

  @ContentChild(ComboboxItemDirective, { static: true })
  itemTemplate: ComboboxItemDirective;

  selectedItem$ = new BehaviorSubject<IItem | null>(null);

  readonly searchField = new FormControl('');
  readonly isDisabled$ = new BehaviorSubject(false);

  private masterSubscription = new Subscription();
  private activeItem: IItem | null = null;
  private _overlayRef: OverlayRef;
  private _onTouch: () => void;
  private _onChange: (value: string) => void = () => {};

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.masterSubscription.unsubscribe();
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
    const item = this.items.find(i => i.value === value);
    if (item) {
      this._onChange(value);
      this.setSelectedItem(item);
    }
  }

  onFocus(): void {
    this._onTouch();
  }

  onChangeActiveItem(item: IItem): void {
    this.activeItem = item;
  }

  onSelect(item?: IItem): void {
    const currentItem = item || this.activeItem;
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

    const config = new OverlayConfig({
      width: 300,
      hasBackdrop: true,
      backdropClass: 'b-combobox-backdrop',
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });
    this._overlayRef = this._overlay.create(config);

    const subscriptionBackdropClick = this._overlayRef.backdropClick().subscribe(() => this._overlayRef.dispose());
    const subscriptionOverlayAttachments = this._overlayRef.attachments().subscribe(() => {
      const searchInput = this._overlayRef.overlayElement.querySelector('input');
      if (searchInput) {
        this.searchField.setValue('');
        searchInput.focus();
      }
    });

    this.masterSubscription.add(subscriptionBackdropClick);
    this.masterSubscription.add(subscriptionOverlayAttachments);

    this._overlayRef.attach(new TemplatePortal(this.popupRef, this._viewContainerRef));
  }

  closePopup(): void {
    this._overlayRef.dispose();
    this.labelRef.nativeElement.focus();
  }

  private setSelectedItem(item: IItem): void {
    this.selectedItem$.next(item);
  }
}
