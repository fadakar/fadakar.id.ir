// @ts-ignore
import moment from 'jalali-moment';


export class Jalali {
  public static toJalali(date: any, format = 'YYYY/MM/DD') {
    const MomentDate = moment(date, format);
    return MomentDate.locale('fa').format(format);
  }
}


