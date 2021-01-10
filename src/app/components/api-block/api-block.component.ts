import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IApiItem, IComponentApi } from '../../services/components.service';

@Component({
  selector: 'app-api-block',
  templateUrl: './api-block.component.html',
  styleUrls: ['./api-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiBlockComponent implements OnInit {
  constructor() {
  }

  @Input()
  title: string;

  @Input()
  api: IApiItem[];

  ngOnInit(): void {
  }
}
