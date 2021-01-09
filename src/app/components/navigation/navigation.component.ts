import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const COMPONENTS: Array<{ title: string, selector: string }> = [
  { title: 'Combobox', selector: 'b-combobox' },
];

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  constructor() {
  }

  readonly components$ = new BehaviorSubject(COMPONENTS);

  ngOnInit(): void {
  }
}
