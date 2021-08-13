import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


export class ModalHandler {

  private static stack: NgbModalRef[] = [];


  static push(item: NgbModalRef) {
    this.stack[this.stack.length] = item;
  }

  static pop(): NgbModalRef {
    if (this.stack.length > 0) {
      return this.stack.splice(this.stack.length - 1, 1)[0];
    }
    return null;
  }

  static top(): NgbModalRef {
    if (this.stack.length > 0) {
      return this.stack[this.stack.length - 1];
    }
    return null;
  }

  static clear() {
    this.stack = [];
  }

  static get count() {
    return this.stack.length;
  }
}

