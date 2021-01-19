import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

class Country {
  constructor(public code: string, public name: string, public icon: string) {
  }

  toString(): string {
    return this.name;
  }
}

@Component({
  selector: 'app-combobox-example',
  templateUrl: './combobox-example.component.html',
  styleUrls: ['./combobox-example.component.scss']
})
export class ComboboxExampleComponent implements OnInit {
  constructor(private _fb: FormBuilder) { }

  items = [
    new Country('rus', 'Россия', 'rus.svg'),
    new Country('uk', 'Великобритания', 'uk.svg'),
    new Country('fr', 'Франция', 'fr.svg'),
    new Country('il', 'Израиль', 'il.svg'),
    new Country('usa', 'США', 'usa.svg'),
    new Country('arm', 'Армения', 'arm.svg'),
    new Country('by', 'Республика Беларусь', 'by.svg'),
  ];

  readonly form = this._fb.group({
    country: this._fb.control({ value: 'il', disabled: false }),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => console.log(values));
  }

  filter(item: Country, phrase: string): boolean {
    return item.name.toLowerCase().includes(phrase.toLowerCase());
  }

  getValue(item: Country): string {
    return item.code;
  }
}
