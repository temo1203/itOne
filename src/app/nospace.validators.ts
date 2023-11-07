import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpace(control: AbstractControl): ValidationErrors | null {
  const controlValue = control.value as string;

  if (controlValue.includes(' ')) {
    return { noSpaceVal: true };
  }

  return null;
}
