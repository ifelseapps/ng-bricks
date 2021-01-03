import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'b-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ComboboxComponent implements OnInit, OnDestroy {
  constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) { }

  @Output()
  selectItem = new EventEmitter<string>();

  @ViewChild('label', { static: true })
  labelRef: ElementRef<HTMLElement>;

  @ViewChild('popup', { static: true })
  popupRef: TemplateRef<any>;

  isVisiblePopup$: Observable<boolean>;
  selectedItem$ = new BehaviorSubject<IItem | null>(null);
  items: IItem[] = [
    { value: '0001', name: 'item 1' },
    { value: '0002', name: 'item 2' },
    { value: '0003', name: 'item 3' },
    { value: '0004', name: 'item 4' },
    { value: '0005', name: 'item 5' },
    // { value: '0006', name: 'item 6' },
    // { value: '0007', name: 'item 7' },
    // { value: '0008', name: 'item 8' },
    // { value: '0009', name: 'item 9' },
    // { value: '00010', name: 'item 10' },
    // { value: '00113', name: 'item 11' },
    // { value: '01203', name: 'item 12' },
    // { value: '13003', name: 'item 13' },
    // { value: '00014', name: 'item 14' },
    // { value: '00153', name: 'item 15' },
    // { value: '01603', name: 'item 16' },
    // { value: '0004', name: 'item 4' },
    // { value: '0005', name: 'item 5' },
    // { value: '0006', name: 'item 6' },
    // { value: '0007', name: 'item 7' },
    // { value: '0008', name: 'item 8' },
    // { value: '0009', name: 'item 9' },
  ];

  searchField = new FormControl('');

  private masterSubscription = new Subscription();
  private activeItem: IItem | null = null;
  private _overlayRef: OverlayRef;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.masterSubscription.unsubscribe();
  }

  onChangeActiveItem(item: IItem): void {
    this.activeItem = item;
  }

  onSelect(item?: IItem): void {
    const currentItem = item || this.activeItem;
    if (currentItem) {
      this.setSelectedItem(currentItem);
      this.selectItem.emit(currentItem.value);
      this.closePopup();
    }
  }

  openPopup(): void {
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
        searchInput.focus();
      }
    });

    this.masterSubscription.add(subscriptionBackdropClick);
    this.masterSubscription.add(subscriptionOverlayAttachments);

    this._overlayRef.attach(new TemplatePortal(this.popupRef, this._viewContainerRef));
  }

  closePopup(): void {
    this._overlayRef.dispose();
  }

  private setSelectedItem(item: IItem): void {
    this.selectedItem$.next(item);
  }
}
