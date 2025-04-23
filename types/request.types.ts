export type RequestMethodType = string;

export type RequestParamsType<T> = Record<string, T>;

type RequestObjectType<T> = {
  method: RequestMethodType;
  params?: RequestParamsType<T>;
};

type RequestArrayType<T> = [method: RequestMethodType, params?: RequestParamsType<T>];

type RequestType<T> = RequestObjectType<T> | RequestArrayType<T>;

export type BatchRequestType<T> = Record<string, RequestType<T>> | RequestType<T>[];
