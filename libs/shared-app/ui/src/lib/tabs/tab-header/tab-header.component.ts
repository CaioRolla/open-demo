import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'demo-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabHeaderComponent implements OnInit {

  @Input() tabId: string | null = null;
  @Input() disabled: boolean = false;

  @Output() public clickEvent = new EventEmitter<void>();

  private readonly _selected$ = new BehaviorSubject<boolean>(false);

  public readonly selected$ = this._selected$.asObservable();
  
  constructor() { }

  ngOnInit(): void {
  }

  public select(): void {
    this._selected$.next(true);
  }

  public unselect(): void {
    this._selected$.next(false);
  }

}
