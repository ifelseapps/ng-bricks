import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BehaviorSubject, merge, Observable, Subscription } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { IItem } from './models/item';

@Component({
  selector: 'b-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ComboboxComponent implements OnInit, OnDestroy {
  constructor(private focusMonitor: FocusMonitor) { }

  @Output()
  selectItem = new EventEmitter<string>();

  @ViewChild('label', { static: true })
  labelRef: ElementRef<HTMLElement>;

  @ViewChild(CdkConnectedOverlay, { static: true })
  popupRef: CdkConnectedOverlay;

  isVisiblePopup$: Observable<boolean>;
  selectedItem$ = new BehaviorSubject<IItem | null>(null);
  items: IItem[] = [
    { value: '0001', name: 'item 1' },
    { value: '0002', name: 'item 2' },
    { value: '0003', name: 'item 3' },
  ];

  private masterSubscription = new Subscription();
  private activeItem: IItem | null = null;

  ngOnInit(): void {
    const triggerFocus$ = this.focusMonitor.monitor(this.labelRef.nativeElement)
      .pipe(
        filter(origin => Boolean(origin)),
        mapTo(true),
      );

    const backdropClick$ = this.popupRef.backdropClick
      .pipe(mapTo(false));

    this.isVisiblePopup$ = merge(triggerFocus$, backdropClick$);

    const subscription = this.isVisiblePopup$
      .pipe(filter(Boolean))
      .subscribe(
        () => setTimeout(() => {
          const input = this.popupRef.overlayRef.overlayElement.querySelector('input');
          if (input) {
            input.focus();
          }
        }, 0)
      );
    this.masterSubscription.add(subscription);
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

  closePopup(): void {
    this.popupRef.overlayRef.dispose();
  }

  private setSelectedItem(item: IItem): void {
    this.selectedItem$.next(item);
  }
}
