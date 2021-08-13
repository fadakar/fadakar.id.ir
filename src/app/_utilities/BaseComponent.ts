import {AbstractControl} from '@angular/forms';
import {__v} from './FormValidations';
import {OpenMode} from './_types/OpenMode';
import {RialMaskConfig} from './SharedConfigs';
import {of} from 'rxjs';

export class BaseComponent {
  public openMode: OpenMode = OpenMode.normal;

  public get OpenMode() {
    return OpenMode;
  }

  get RialMaskConfig() {
    return RialMaskConfig;
  }

  constructor() {
  }

  __v(name, control: AbstractControl) {
    return __v(name, control);
  }

  isControlValid(control: AbstractControl): boolean {
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  public isOpenModeSelect(): boolean {
    if (this.openMode === OpenMode.selectWithReturn || this.openMode === OpenMode.select) {
      return true;
    }
    return false;
  }


}
