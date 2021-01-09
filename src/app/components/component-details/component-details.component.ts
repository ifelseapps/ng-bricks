import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDetailsComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _http: HttpClient,
    private _componentsService: ComponentsService,
  ) {
  }

  selector$ = this._activatedRoute.params.pipe(map(params => params.id));
  api$: Observable<any>;
  demo$: Observable<Type<unknown> | null>;

  ngOnInit(): void {
    // TODO: перенести в сервис и типизировать
    this.api$ = this.selector$
      .pipe(
        switchMap(selector => this._http.get(`/assets/components-api/${selector}.json`)),
        map((data: any) => data.api)
      );

    this.demo$ = this.selector$
      .pipe(
        map(selector => {
          const details = this._componentsService.getComponentDetailsBySelector(selector);
          if (details) {
            return details.component;
          }
          return null;
        })
      );
  }
}
