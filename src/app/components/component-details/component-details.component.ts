import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDetailsComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute, private _http: HttpClient) {
  }

  selector$ = this._activatedRoute.params.pipe(map(params => params.id));
  api$: Observable<any>;

  ngOnInit(): void {
    // TODO: перенести в сервис и типизировать
    this.api$ = this.selector$
      .pipe(
        switchMap(selector => this._http.get(`/assets/components-api/${selector}.json`)),
        map((data: any) => data.api)
      );
  }
}
