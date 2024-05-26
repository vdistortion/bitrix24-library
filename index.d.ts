interface IAuth {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  domain: string;
  member_id: string;
}

interface IUser {
  id: string;
  name: string;
}

interface IAccess {
  id: string;
  name: string;
}

interface IAccessPayload {
  (callback?: Function): IAccess[];
  (disablesValues?: string[], callback?: Function): IAccess[];
}

interface IAccessPayloadPromise {
  (): Promise<IAccess[]>;
  (disablesValues?: string[]): Promise<IAccess[]>;
}

interface ISelectCRM {
  entityType: string[];
  multiple: boolean;
  value: string[] | { [key: string]: number[] };
}

interface ISelectCRMResponse {
  [key: string]: Array<{ [key: string]: string }>;
}

interface IHandlerList {
  [key: string]: (data: any) => any;
}

interface IBitrix24 {
  init: (callback: Function) => void;
  install: (callback: Function | string) => void;
  installFinish: () => void;
  getAuth: () => IAuth;
  refreshAuth: (callback: Function) => IAuth;
  callMethod: (method: string, params: any, callback?: Function) => void;
  callBatch: (calls: TRequests, callback?: Function, bHaltOnError?: boolean) => void;
  callBind: (event: string, handler: string, auth_type?: number, callback?: Function) => void;
  callUnbind: (event: string, handler: string, auth_type?: number, callback?: Function) => void;
  userOption: {
    set: (name: string, value: string) => void;
    get: (name: string) => string;
  };
  appOption: {
    set: (name: string, value: string, callback?: Function) => void;
    get: (name: string) => string;
  };
  selectUser: (callback: Function) => IUser;
  selectUsers: (callback: Function) => IUser[];
  selectAccess: IAccessPayload;
  selectCRM: (params: ISelectCRM, callback?: Function) => ISelectCRMResponse;
  placement: {
    bindEvent: (event: any, callback: Function) => void;
    call: (command: any, params: any, callback: Function) => void;
    getInterface: (callback: Function) => void;
    info: () => { placement: string; options: any };
  };
  isAdmin: () => boolean;
  getLang: () => string;
  resizeWindow: (width: number, height: number, callback?: Function) => void;
  fitWindow: (callback?: Function) => void;
  reloadWindow: () => void;
  setTitle: (title: string, callback?: Function) => void;
  ready: (handler: Function) => void;
  isReady: () => boolean;
  proxy: (func: Function, thisObject: any) => any;
  closeApplication: () => void;
  getDomain: () => string;
  openApplication: (params?: any, closeCallback?: Function) => void;
  openPath: (path: string, callback?: Function) => void;
  proxyContext: () => any;
  scrollParentWindow: (scroll: number, callback?: Function) => void;
  bind: (element: HTMLElement, event: string, handler: Function) => void;
  unbind: (element: HTMLElement, event: string, handler: Function) => void;
  getScrollSize: () => { scrollWidth: number; scrollHeight: number };
  loadScript: (script: string | string[], callback?: Function) => void;
  im: {
    callTo: (userId: string | number, video?: boolean) => void;
    phoneTo: (phone: string) => void;
    openMessenger: (dialogId?: string) => void;
    openHistory: (dialogId: string) => void;
  };
}

interface IBitrix24Promise {
  BX24: IBitrix24;
  init: () => Promise<void>;
  install: (callback?: string) => Promise<void>;
  installFinish: () => void;
  getAuth: () => IAuth;
  refreshAuth: () => Promise<IAuth>;
  callMethod: (method: string, params: any, callback?: Function) => void;
  callBatch: (calls: TRequests, bHaltOnError?: boolean) => Promise<any>;
  callBind: (event: string, handler: string, auth_type?: number, callback?: Function) => Function;
  callUnbind: (event: string, handler: string, auth_type?: number, callback?: Function) => void;
  userOption: {
    set: (name: string, value: string) => void;
    get: (name: string) => string;
  };
  appOption: {
    set: (name: string, value: string) => Promise<void>;
    get: (name: string) => string;
  };
  selectUser: () => Promise<IUser>;
  selectUsers: () => Promise<IUser[]>;
  selectAccess: IAccessPayloadPromise;
  selectCRM: (params: ISelectCRM) => Promise<ISelectCRMResponse>;
  placement: {
    bindEvent: (event: any) => Promise<unknown>;
    call: (command: any, params: any) => Promise<unknown>;
    getInterface: () => Promise<unknown>;
    info: () => { placement: string; options: any };
  };
  isAdmin: () => boolean;
  getLang: () => string;
  resizeWindow: (width: number, height: number) => Promise<void>;
  fitWindow: () => Promise<void>;
  reloadWindow: () => void;
  setTitle: (title: string) => Promise<void>;
  ready: () => Promise<void>;
  isReady: () => boolean;
  proxy: (func: Function, thisObject: any) => any;
  closeApplication: () => void;
  getDomain: (isOrigin?: boolean) => string;
  openApplication: (params?: any) => Promise<void>;
  openPath: (path: string) => Promise<void>;
  proxyContext: () => any;
  scrollParentWindow: (scroll: number) => Promise<void>;
  bind: (element: HTMLElement, event: string, handler: Function) => Function;
  unbind: (element: HTMLElement, event: string, handler: Function) => void;
  getScrollSize: () => { scrollWidth: number; scrollHeight: number };
  im: {
    callTo: (userId: string | number, video?: boolean) => void;
    phoneTo: (number: string) => void;
    openMessenger: (dialogId?: string) => void;
    openHistory: (dialogId: string) => void;
  };
}

interface IBitrix24Batch {
  batch(request: T): Promise<K>;
}

interface IBitrix24Library extends IBitrix24Promise {
  isMobile: (opts: any) => boolean;
  loadScript: (src: string) => Promise<unknown>;
  createBatch: (
    handlerList?: IHandlerList | undefined,
    BatchClass?: IBitrix24Batch | undefined,
  ) => IBitrix24Batch;
  openLink: (url: string, inNewTab?: boolean) => void;
}
