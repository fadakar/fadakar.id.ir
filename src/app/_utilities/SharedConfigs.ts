import {CurrencyMaskConfig, CurrencyMaskInputMode} from 'ngx-currency';
import {IConfig} from 'ngx-mask';


export const RialMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: '.',
  precision: 0,
  prefix: '',
  suffix: '  ریال  ',
  thousands: ',',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


export const customMaskConfig: Partial<IConfig> | (() => Partial<IConfig>) = {
  validation: true,
};
