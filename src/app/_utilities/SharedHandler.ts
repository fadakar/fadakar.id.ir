import {BehaviorSubject} from 'rxjs';

export abstract class SharedHandler {
  // -------------------------------------  actions   ----------------------------------------------
  public static fromSideBar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public static customerSticky$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  // -------------------------------------  resources ------------------------------------------------
  public static customerId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public static productId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);


  static resetFromSideBar() {
    this.fromSideBar$.next(false);
  }

  static resetCustomerStiky() {
    this.customerSticky$.next(false);
  }

  static reset(forceReset = false) {
    if (forceReset === false && this.fromSideBar$.value === true) {
      return;
    }
    if (forceReset === true || this.customerSticky$.value === false) {
      this.customerId$.next(null);
    }
    this.productId$.next(null);
  }
}


