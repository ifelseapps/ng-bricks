import { OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

export class BricksOverlayRef {
  private constructor(private _overlayRef: OverlayRef) {}

  private _subscriptions: Record<string, Subscription> = {};

  readonly isOpened$ = new BehaviorSubject(false);

  static create(overlayRef: OverlayRef): BricksOverlayRef {
    const ref = new BricksOverlayRef(overlayRef);
    ref.init();
    return ref;
  }

  init(): void {
    this._subscriptions.backdropClick = this._overlayRef.backdropClick().subscribe(() => this.close());
  }

  destroy(): void {
    Object.values(this._subscriptions).forEach(s => s.unsubscribe());
  }

  open<T = unknown>(portal: ComponentPortal<T> | TemplatePortal<T>, onAfter?: (el: HTMLElement) => void): void {
    if (typeof onAfter === 'function') {
      this._subscriptions.attachments = this._overlayRef.attachments().subscribe(() => onAfter(this._overlayRef.overlayElement));
    }

    this._overlayRef.attach(portal);
    this.isOpened$.next(true);
  }

  close(onAfter?: () => void): void {
    if (this._subscriptions.attachments) {
      this._subscriptions.attachments.unsubscribe();
    }

    this._overlayRef.dispose();
    this.isOpened$.next(false);

    if (typeof onAfter === 'function') {
      onAfter();
    }
  }
}
