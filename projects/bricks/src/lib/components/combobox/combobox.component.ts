import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BehaviorSubject, merge, Observable, Subscription } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { CdkConnectedOverlay, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { IItem } from './models/item';
import { TemplatePortal } from '@angular/cdk/portal';

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
  ];

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

    // TODO: отписываться от подписок
    this._overlayRef.backdropClick().subscribe(() => this._overlayRef.dispose());
    this._overlayRef.attachments().subscribe(() => {
      const searchInput = this._overlayRef.overlayElement.querySelector('input');
      if (searchInput) {
        searchInput.focus();
      }
    });

    this._overlayRef.attach(new TemplatePortal(this.popupRef, this._viewContainerRef));
  }

  closePopup(): void {
    this._overlayRef.dispose();
  }

  private setSelectedItem(item: IItem): void {
    this.selectedItem$.next(item);
  }
}
