import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { merge, Observable, Subscription } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

@Component({
  selector: 'lib-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ComboboxComponent implements OnInit, OnDestroy {
  constructor(private focusMonitor: FocusMonitor) { }

  @ViewChild('label', { static: true })
  labelRef: ElementRef<HTMLElement>;

  @ViewChild(CdkConnectedOverlay, { static: true })
  popupRef: CdkConnectedOverlay;

  isVisiblePopup$: Observable<boolean>;

  private masterSubscription = new Subscription();

  ngOnInit(): void {
    const triggerFocus$ = this.focusMonitor.monitor(this.labelRef.nativeElement)
      .pipe(
        filter(origin => Boolean(origin)),
        mapTo(true),
      );

    const backdropClick$ = this.popupRef.backdropClick
      .pipe(mapTo(false));

    backdropClick$.subscribe((x: any) => console.log(x));

    this.isVisiblePopup$ = merge(triggerFocus$, backdropClick$);
  }

  ngOnDestroy(): void {
    this.masterSubscription.unsubscribe();
  }
}
