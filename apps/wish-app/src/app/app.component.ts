import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';


@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _router: Router, @Inject(DOCUMENT) private document: Document) {}

  public ngOnInit(): void {
    this._router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        const splashScreen = this.document.getElementById('splash-screen');
        if (splashScreen) {
          splashScreen.remove();
        }
      });
  }
}
