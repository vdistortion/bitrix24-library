import type { RequestMethodType, RequestParamsType } from './request.types';

export type AjaxResultType<R, D> = {
  answer: {
    result: R;
    time: {
      date_start: string;
      date_finish: string;
      duration: number;
      finish: number;
      operating: number;
      operating_reset_at: number;
      processing: number;
      start: number;
    };
    total: number;
  };
  query: {
    method: RequestMethodType;
    data: RequestParamsType<D>;
    callback: (response?: any) => void;
  };
  status: number;
  date: () => any;
  error: () => any;
  more: () => any;
  total: () => number;
  time: () => any | undefined;
  next: (cb?: Function) => any | false;
};
