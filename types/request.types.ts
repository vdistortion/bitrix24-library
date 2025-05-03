import type { MethodsListType } from './methods-list.types';

export type RequestMethodType = MethodsListType | string;

type RequestObjectType<T> = {
  method: RequestMethodType;
  params?: T;
};

type RequestArrayType<T> = [method: RequestMethodType, params?: T];

export type RequestType<T> = RequestObjectType<T> | RequestArrayType<T>;

export type AjaxResultType<R, P> = {
  answer: {
    result: R;
    time?: {
      date_start: string;
      date_finish: string;
      duration: number;
      finish: number;
      operating: number;
      operating_reset_at: number;
      processing: number;
      start: number;
    };
    total?: number;
    error?: unknown;
    next?: unknown;
  };
  query: {
    method: RequestMethodType;
    data: P;
    callback: (response?: AjaxResultType<R, P>) => void;
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
  next: (cb?: Function) => false | XMLHttpRequest;
  total: () => number;
};
