import { AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

export const handleResetControl = (
  action: string,
  control: AbstractControl,
  actions$: Observable<string>,
  unsub: Subscription
): void => {
  const sub = actions$.subscribe((a) => {
    if (a === action) {
      control.reset();
    }
  });
  unsub.add(sub);
};
