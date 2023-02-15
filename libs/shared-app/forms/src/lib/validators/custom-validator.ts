import {
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
  FormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { isValidCron } from 'cron-validator';

export abstract class CustomValidators {
  public static URL(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    try {
      new URL(control.value);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  }

  public static CPF(control: AbstractControl): ValidationErrors | null {
    if (!control.value || isValidCPF(control.value)) {
      return null;
    }
   
    return {
      CPF: true
    }

  }

  public static cronExpression(
    control: AbstractControl
  ): ValidationErrors | null {
    if (control.value && !isValidCron(control.value)) {
      return { cronExpression: true };
    }
    return null;
  }

  public static confirmPassword(
    controlName: string,
    matchingControlName: string
  ) {
    return (formGroup: UntypedFormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPassword']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

function isValidCPF(cpf: string) {
  if (typeof cpf !== "string") return false
  cpf = cpf.replace(/[\s.-]*/igm, '')
  if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999" 
  ) {
      return false
  }
  let soma = 0
  let resto
  for (let i = 1; i <= 9; i++) 
      soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11))  resto = 0
  if (resto != parseInt(cpf.substring(9, 10)) ) return false
  soma = 0
  for (let i = 1; i <= 10; i++) 
      soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11))  resto = 0
  if (resto != parseInt(cpf.substring(10, 11) ) ) return false
  return true
}