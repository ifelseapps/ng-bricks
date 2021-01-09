import { Injectable, Type } from '@angular/core';
import { ComboboxExampleComponent } from '../examples/combobox-example/combobox-example.component';

export interface IComponentDescription {
  name: string;
  selector: string;
  component: Type<unknown>;
}

@Injectable({ providedIn: 'root' })
export class ComponentsService {
  constructor() {
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

  getComponents(): IComponentDescription[] {
    return this._components;
  }
}
