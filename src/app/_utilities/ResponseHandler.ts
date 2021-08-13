import Swal, {SweetAlertIcon} from 'sweetalert2';
import {ApiResponse} from './ApiResponse';


export class ResponseHandler {

  public static handle<T>(response: ApiResponse<T>): T {
    // TODO handle all alerts from server
    if (response.messages !== undefined && response.messages.length > 0) {
      let model: SweetAlertIcon = 'warning';
      let bg = '#eee';
      switch (response.model) {
        case 1:
          model = 'info';
          bg = '#5da7e0';
          break;
        case 2:
          model = 'success';
          bg = '#5de063';
          break;
        case 3:
          model = 'error';
          bg = '#e0775d';
          break;
        case 4:
          model = 'warning';
          bg = '#e0b45d';
          break;
        case 5:
          model = 'question';
          break;
      }

      if (response.type === 1) // toast
      {
        Swal.fire({
          position: 'bottom-right',
          icon: model,
          toast:true,
          title: response.messages[0].toString(),
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2500,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
      } else if (response.type === 2) // modal
      {
        Swal.fire({
          html: response.messages[0].toString(),
          icon: model,
          confirmButtonText: 'باشه !'
        });
      }


    }
    if (response.model !== 3) {
      return response.data;
    }
    return null as any;

  }

}
