import { IsMobileOptions } from 'is-mobile';

export declare type TMethod = string;

export declare type TParams = Record<string, T>;

export declare type TRequestObject = {
  method: TMethod;
  params?: TParams;
};

export declare type TRequestArray = [method: TMethod, params?: TParams];

export declare type BatchRequestType = Record<string, TRequestObject | TRequestArray>;

export declare type EventTargetType = Element | Document | Window;

export declare interface IAuth {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  domain: string;
  member_id: string;
}

export declare interface IUser {
  id: string;
  name: string;
  photo: string;
  position: string;
  sub: boolean;
  sup: boolean;
  url: string;
}

export declare interface IAccess {
  id: string;
  name: string;
  provider: string;
}

export declare interface IAccessPayload {
  (callback: (res: IAccess[]) => void): void;
  (disablesValues: string[], callback: (res: IAccess[]) => void): IAccess[];
}

export declare type EntityType = 'deal' | 'lead' | 'company' | 'contact' | 'quote';

export declare interface ISelectCRM {
  entityType?: EntityType[];
  multiple?: boolean;
  value?: string[] | Record<string, number[]>;
}

export declare interface ISelectCRMResponse {
  [key: EntityType]: Record<string, string>;
}

export declare interface ISelectCRMPayload {
  (callback: (res: ISelectCRMResponse) => void): void;
  (config: ISelectCRM, callback: (res: ISelectCRMResponse) => void): void;
}

export declare interface IHandlerList {
  [key: string]: (data: any) => any;
}

export declare interface IPlacementInfo {
  placement: string;
  options: any;
}

export declare function eventHandler(e?: Event): void;

export declare interface IBitrix24 {
  init: (callback: Function) => void;
  install: (callback?: Function | string) => void;
  installFinish: () => void;
  getAuth: () => IAuth;
  refreshAuth: (callback: Function) => IAuth;
  callMethod: (method: string, params: any, callback?: Function) => void;
  callBatch: (calls: BatchRequestType, callback?: Function, bHaltOnError?: boolean) => void;
  callBind: (event: string, handler: string, auth_type?: number, callback?: Function) => void;
  callUnbind: (event: string, handler: string, auth_type?: number, callback?: Function) => void;
  userOption: {
    set: (name: string, value: any) => void;
    get: (name: string) => any;
  };
  appOption: {
    set: (name: string, value: any, callback?: Function) => void;
    get: (name: string) => any;
  };
  selectUser: (callback: (res: IUser) => void) => void;
  selectUsers: (callback: (res: IUser[]) => void) => void;
  selectAccess: IAccessPayload;
  selectCRM: ISelectCRMPayload;
  placement: {
    bindEvent: (event: any, callback: Function) => void;
    call: (command: any, params: any, callback: Function) => void;
    getInterface: (callback: Function) => void;
    info: () => IPlacementInfo;
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
  bind: (element: EventTargetType, event: string, handler: eventHandler) => void;
  unbind: (element: EventTargetType, event: string, handler: eventHandler) => void;
  getScrollSize: () => { scrollWidth: number; scrollHeight: number };
  loadScript: (script: string | string[], callback?: Function) => void;
  im: {
    callTo: (userId: string | number, video?: boolean) => void;
    phoneTo: (phone: string) => void;
    openMessenger: (dialogId?: string) => void;
    openHistory: (dialogId: string) => void;
  };
}

export declare interface IBitrix24Promise {
  BX24: IBitrix24;
  init: () => Promise<void>;
  install: (callback?: string) => Promise<void>;
  installFinish: () => void;
  getAuth: () => IAuth;
  refreshAuth: () => Promise<IAuth>;
  callMethod: (method: string, params: any, callback?: Function) => void;
  callBatch: (calls: BatchRequestType, bHaltOnError?: boolean) => Promise<any>;
  callBind: (event: string, handler: string, auth_type?: number, callback?: Function) => Function;
  callUnbind: (event: string, handler: string, auth_type?: number, callback?: Function) => void;
  userOption: {
    set: (name: string, value: any) => void;
    get: (name: string) => any;
  };
  appOption: {
    set: (name: string, value: any) => Promise<any>;
    get: (name: string) => any;
  };
  selectUser: () => Promise<IUser>;
  selectUsers: () => Promise<IUser[]>;
  selectAccess: (disablesValues?: string[]) => Promise<IAccess[]>;
  selectCRM: (config?: ISelectCRM) => Promise<ISelectCRMResponse>;
  placement: {
    bindEvent: (event: any) => Promise<unknown>;
    call: (command: any, params: any) => Promise<unknown>;
    getInterface: () => Promise<unknown>;
    info: () => IPlacementInfo;
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
  bind: (element: EventTargetType, event: string, handler: eventHandler) => Function;
  unbind: (element: EventTargetType, event: string, handler: eventHandler) => void;
  getScrollSize: () => { scrollWidth: number; scrollHeight: number };
  im: {
    callTo: (userId: string | number, video?: boolean) => void;
    phoneTo: (number: string) => void;
    openMessenger: (dialogId?: string) => void;
    openHistory: (dialogId: string) => void;
  };
}

export declare interface IBitrix24Batch {
  batch(request: BatchRequestType): Promise<any>;
}

export declare interface IBitrix24Library extends IBitrix24Promise {
  isMobile: (opts?: IsMobileOptions) => boolean;
  loadScript: (src: string) => Promise<unknown>;
  createBatch: (
    handlerList?: IHandlerList | undefined,
    BatchClass?: IBitrix24Batch | undefined,
  ) => IBitrix24Batch;
  openLink: (url: string, inNewTab?: boolean) => void;
}

declare function init(): Promise<IBitrix24Library>;

export declare interface IBitrix24Plugin {
  init: init;
}

declare global {
  interface Window {
    BX24: IBitrix24;
  }
}
