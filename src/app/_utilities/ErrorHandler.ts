import {HttpErrorResponse} from '@angular/common/http';
import {EMPTY} from 'rxjs';
import Swal from 'sweetalert2';

export class ErrorHandler {

  public static handle(error: HttpErrorResponse) {

    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `${error.status} : ${error.error.message}`;
    } else {
      // Server-side errors
      switch (error.status) {
        case 400: // validation error bad request
          Swal.fire({
            title: 'خطا',
            html: 'داده های ارسالی به سرور صحیح نمیباشد',
            icon: 'error',
            confirmButtonText: 'باشه !'
          });
          break;
        case 404: // not found error
          Swal.fire({
            title: 'خطا',
            html: 'درخواست شما یافت نشد',
            icon: 'error',
            confirmButtonText: 'باشه !'
          });
          break;
        case 500: // internal error
          Swal.fire({
            title: 'خطا',
            html: 'سرور مشکل خطا شده است' + '<br/>' + error.error.message,
            icon: 'error',
            confirmButtonText: 'باشه !'
          });
          break;
        case 403: // forbidden access denied
          Swal.fire({
            title: 'خطا',
            html: 'شما به این عملیات دسترسی ندارید',
            icon: 'error',
            confirmButtonText: 'باشه !'
          });
      }
    }


    console.log(error);
    return EMPTY;
  }

}
