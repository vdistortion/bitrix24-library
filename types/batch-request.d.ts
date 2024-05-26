type TMethod = string;

type TParams = {
  [key: string]: any;
};

type TRequestObject = {
  method: TMethod;
  params?: TParams;
};

type TRequestArray = [method: TMethod, params?: TParams];

type TRequest = TRequestObject | TRequestArray;

type TRequests = {
  [key: string]: TRequest;
};
