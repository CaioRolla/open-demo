import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Dialog, NUI_DIALOG_DATA } from '@demo/shared-app/ui/dialog';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { AuthConfig } from '../../auth-app.config';

@Component({
  selector: 'demo-permissions-dialog',
  templateUrl: './permissions-dialog.component.html',
  styleUrls: ['./permissions-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionsDialogComponent implements OnInit {
  public readonly active$ = new BehaviorSubject<string>(this._config.permissions[0].title);

  public readonly options$ = new BehaviorSubject(
    this._config.permissions.map((section) => {
      return {
        title: section.title,
        icon: section.icon,
        permissions: section.permissions.map((permission) => {
          return {
            name: permission.name,
            desc: permission.desc,
            value: permission.value,
            selected: this.data.permissions.includes(permission.value),
          };
        }),
      };
    })
  );

  public readonly activeSection$ = combineLatest([this.active$, this.options$]).pipe(
    map(([active, options]) => {
      return options.find((o) => o.title === active);
    })
  );

  constructor(
    @Inject(NUI_DIALOG_DATA) public readonly data: { permissions: string[] },
    private readonly _config: AuthConfig,
    private readonly _dialog: Dialog
  ) {}

  ngOnInit(): void {}

  public optionChanged(title: string, value: string, selected: boolean): void {
    const state = this.options$.value.map((section) => {
      if (section.title === title) {
        return {
          ...section,
          permissions: section.permissions.map((permission) => {
            if (permission.value === value) {
              return {
                ...permission,
                selected,
              };
            }
            return permission;
          }),
        };
      }

      return section;
    });

    this.options$.next(state);
  }

  public onCancel(): void {
    this._dialog.close(this.data.permissions);
  }

  public onSelectAll(): void {
    const state = this.options$.value.map((section) => {
      return {
        ...section,
        permissions: section.permissions.map((permission) => {
          return {
            ...permission,
            selected: true,
          };
        }),
      };
    });

    this.options$.next(state);
  }

  public onSave(): void {
    this._dialog.close(
      this.options$.value
        .map((opt) => opt.permissions.filter((p) => p.selected).map((p) => p.value))
        .reduce((acc, prev) => {
          return [...acc, ...prev];
        }, [])
    );
  }
}
