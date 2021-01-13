import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-combobox-example',
  templateUrl: './combobox-example.component.html',
  styleUrls: ['./combobox-example.component.scss']
})
export class ComboboxExampleComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  readonly form = this._fb.group({
    country: this._fb.control({ value: '0002', disabled: false }),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => console.log(values));
  }

}
