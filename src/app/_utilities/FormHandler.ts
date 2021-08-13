import {RxFormBuilder, RxFormGroup} from '@rxweb/reactive-form-validators';


export class FormHandler {


  public static toFormData<T>(model: T) {
    const fb: RxFormBuilder = new RxFormBuilder();
    return (fb.formGroup<T>(model) as RxFormGroup).toFormData();
  }

}
