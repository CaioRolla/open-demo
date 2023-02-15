import { AbstractControl } from '@angular/forms';
import { ErrorResponseDto } from '@demo/shared/utils';
import { Observable, Subscription } from 'rxjs';

export const handleErrorControl = (
  control: AbstractControl,
  error$: Observable<ErrorResponseDto | null | undefined>,
  unsub: Subscription
): void => {
  const sub = error$.subscribe((error) => {
    if (error) {
      control.setErrors({
        [`status:${error.status}`]: error.message,
        ...error.message.reduce((acc, message) => {
          return {
            ...acc,
            [`message:${message}`]: message,
          };
        }, {}),
      });
    }
  });

  unsub.add(sub);
};
