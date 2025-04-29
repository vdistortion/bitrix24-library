import type { RequestMethodType, RequestParamsType } from './request.types';

export type AjaxResultType<R = any, D = any> = {
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
    callback: (response?: AjaxResultType<R, D>) => void;
  };
  status: number;
  data: () => R;
  error: () =>
    | undefined
    | {
        status: number;
        ex: {
          error: string;
          error_description: string;
        };
      };
  error_description: () => undefined | string;
  more: () => boolean;
  total: () => number;
  next: (cb?: Function) => false | XMLHttpRequest;
};
