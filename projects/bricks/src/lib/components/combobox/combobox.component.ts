import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComboboxComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
