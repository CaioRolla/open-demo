import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { letterColorMap } from './avatar.const';

@Component({
  selector: 'demo-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  
  public readonly letterColorMap = letterColorMap;
  
  @Input() alt: string = '';

  @Input() src: string | null = null;

  @Input() size = '32px';

}
