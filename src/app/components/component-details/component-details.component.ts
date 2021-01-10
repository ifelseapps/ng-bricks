import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ComponentsService, IComponentApi, IComponentDescription } from '../../services/components.service';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDetailsComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _componentsService: ComponentsService,
  ) {
  }

  selector$ = this._activatedRoute.params.pipe(map(params => params.id));
  api$: Observable<IComponentApi['api']>;
  demo$: Observable<Type<unknown> | null>;
  description$: Observable<IComponentDescription | null>;

  ngOnInit(): void {
    this.description$ = this.selector$
      .pipe(
        map(selector => this._componentsService.getComponentDetailsBySelector(selector))
      );

    this.api$ = this.selector$
      .pipe(
        switchMap(selector => this._componentsService.getComponentApiBySelector(selector)),
        map(data => data.api)
      );

    this.demo$ = this.selector$
      .pipe(
        map(selector => {
          const details = this._componentsService.getComponentDetailsBySelector(selector);
          if (details && details.component) {
            return details.component;
          }
          return null;
        })
      );
  }
}
