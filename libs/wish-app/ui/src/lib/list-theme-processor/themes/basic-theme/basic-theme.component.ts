import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { GetAllProductDto, ListTheme } from '@demo/wish-shared/core';

@Component({
  selector: 'demo-basic-theme',
  templateUrl: './basic-theme.component.html',
  styleUrls: ['./basic-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicThemeComponent implements OnInit {

  @Input() name!: string;

  @Input() desc!: string | null;

  @Input() bannerUrl!: string | null;

  @Input() profileUrl!: string | null;

  @Input() theme!: ListTheme | null;

  @Input() products!: GetAllProductDto[];

  constructor() {}

  ngOnInit(): void {}
}
