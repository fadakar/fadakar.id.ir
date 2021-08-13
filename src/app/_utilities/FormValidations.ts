import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}


export function _getFormValidationErrors(name, control: AbstractControl): AllValidationErrors[] {
  const errors: AllValidationErrors[] = [];

  const controlErrors: ValidationErrors = control.errors;
  if (controlErrors !== null) {
    Object.keys(controlErrors).forEach(keyError => {
      errors.push({
        control_name: name,
        error_name: keyError,
        error_value: controlErrors[keyError]
      });
    });
  }
  return errors;
}


export function __v(name, control: AbstractControl) {
  const errors = _getFormValidationErrors(name, control);
  const allErrorText = [];

  errors.forEach((error) => {
    let text;
    switch (error.error_name) {
      case 'alpha':
        text = `${name} باید متن باشد `;
        break;
      case 'digit':
        text = `${name} باید عددی باشد `;
        break;
      case 'numeric':
        text = `${name} باید عددی باشد `;
        break;
      case 'required':
        text = `${name} اجباری است `;
        break;
      case 'pattern':
        text = `${name} has wrong pattern!!!!!`;
        break;
      case 'email':
        text = `ایمیل وارد شده در ${name} اشتباه است`;
        break;
      case 'minLength':
        text = `تعداد کارکتر های ${name} باید بیشتر از ${error.error_value.refValues[1]} باشد `;
        break;
      case 'maxLength':
        text = `تعداد کارکتر های ${name} باید کمتر یا برابر ${error.error_value.refValues[1]} باشد `;
        break;
      case 'compare':
        text = `${name} یکسان نیست `;
        break;
      case 'mask':
        text = `قالب داده رعایت نشده ` + ` <span class="px-1" dir="ltr">${error.error_value.requiredMask}</span>`;
        break;
      default:
        text = `${name}: ${error.error_name}: ${error.error_value} !!!!!!! go to utilities/formValidator.ts`;
        console.log('error log formValidator', error);
    }
    allErrorText.push(text);
  });

  return allErrorText;
}









