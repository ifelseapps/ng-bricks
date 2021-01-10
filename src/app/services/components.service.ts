import { Injectable, Type } from '@angular/core';
import { ComboboxExampleComponent } from '../examples/combobox-example/combobox-example.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IComponentDescription {
  name: string;
  selector: string;
  component: Type<unknown>;
}

export interface IApiItem {
  name: string;
  type: string;
  description: string | null;
}

export interface IComponentApi {
  selector: string;
  api: {
    inputs: IApiItem[];
    outputs: IApiItem[];
    methods: IApiItem[];
  };
}

@Injectable({ providedIn: 'root' })
export class ComponentsService {
  constructor(private _http: HttpClient) {
  }

  private _components: IComponentDescription[] = [
    {
      name: 'Combobox',
      selector: 'b-combobox',
      component: ComboboxExampleComponent
    }
  ];

  getComponentDetailsBySelector(selector: string): IComponentDescription | null {
    return this._components.find(c => c.selector === selector) || null;
  }

  getComponentsDetails(): IComponentDescription[] {
    return this._components;
  }

  getComponentApiBySelector(selector: string): Observable<IComponentApi> {
    return this._http.get<IComponentApi>(`/assets/components-api/${selector}.json`);
  }
}
