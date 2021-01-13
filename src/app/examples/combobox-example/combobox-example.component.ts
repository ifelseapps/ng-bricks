import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-combobox-example',
  templateUrl: './combobox-example.component.html',
  styleUrls: ['./combobox-example.component.scss']
})
export class ComboboxExampleComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }

  items = [
    { value: 'rus', name: 'Россия' },
    { value: 'uk', name: 'Великобритания' },
    { value: 'fr', name: 'Франция' },
    { value: 'il', name: 'Израиль' },
    { value: 'usa', name: 'США' },
    { value: 'arm', name: 'Армения' },
    { value: 'by', name: 'Республика Беларусь' },
  ];

  readonly form = this._fb.group({
    country: this._fb.control({ value: 'il', disabled: false }),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => console.log(values));
  }
}
