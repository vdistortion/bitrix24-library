interface CallMethodParams {
  method: string;
  params: any;
}

interface CallBindParams {
  event: string;
  handler: string;
  auth_type?: string | number; // auth_type может быть строкой или числом
}

interface CallUnbindParams {
  event: string;
  handler: string;
  auth_type?: string | null;
}

interface AuthInfo {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  domain: string;
  member_id: string;
}

interface ScrollParams {
  scroll: number;
}

interface SelectAccessParams {
  title?: string;
  value?: any; // Замените any на более конкретный тип, если возможно
}

interface SelectUserParams {
  title?: string;
  mult?: boolean;
}

interface SelectCRMParams {
  entityType?: string;
  multiple?: boolean;
  value?: any; // Замените any на более конкретный тип, если возможно
}

interface OpenApplicationParams {
  [key: string]: any; // Или определите более конкретные ключи и типы
}

// Определяем типы для функций
type Callback = () => void;
type CommandCallback = (response?: any) => void;

interface BX24Interface {
  init: (callback?: CommandCallback) => void;
  install: (callback?: CommandCallback) => void;
  installFinish: () => void;
  getAuth: () => AuthInfo | false;
  refreshAuth: (cb?: CommandCallback) => void;
  callMethod: (method: string, params: any, callback?: CommandCallback) => any;
  callBatch: (
    calls: (CallMethodParams | [string, any])[],
    callback?: CommandCallback,
    bHaltOnError?: boolean,
  ) => void;
  callBind: (
    event: string,
    handler: string,
    auth_type?: string | number,
    callback?: CommandCallback,
  ) => boolean | void;
  callUnbind: (
    event: string,
    handler: string,
    auth_type?: string | null,
    callback?: CommandCallback,
  ) => boolean | void;
  canUse: (method: string) => boolean;
  userOption: {
    get: (name: string) => any; // замените any на более конкретный тип, если возможно
    set: (name: string, value: any) => void; // замените any на более конкретный тип, если возможно
  };
  appOption: {
    get: (name: string) => any; // замените any на более конкретный тип, если возможно
    set: (name: string, value: any, cb?: CommandCallback) => void | Callback;
  };
  selectUser: (title: string | Callback, cb?: Callback) => void;
  selectUsers: (title: string | Callback, cb?: Callback) => void;
  selectAccess: (title: string | Callback, value?: any | Callback, cb?: Callback) => void;
  selectCRM: (params: SelectCRMParams | Callback, cb?: Callback) => void;
  placement: {
    bindEvent: (eventName: string, cb: CommandCallback) => void;
    call: (
      cmd: string,
      params?: Record<string, any> | CommandCallback,
      cb?: CommandCallback,
    ) => void;
    getInterface: (cb: CommandCallback) => void;
    info: () => {
      placement: string; // или другой подходящий тип
      options: Record<string, any>; // замените any на более конкретный тип, если возможно
    };
  };
  isAdmin: () => boolean;
  getLang: () => string;
  resizeWindow: (width: number | string, height: number | string, cb?: CommandCallback) => void;
  fitWindow: (cb?: CommandCallback) => void;
  reloadWindow: (cb?: CommandCallback) => void;
  setTitle: (title: string, cb?: CommandCallback) => void;
  ready: (handler: Callback) => void;
  isReady: () => boolean;
  proxy: (func: Function, thisObject: any) => Function | undefined;
  closeApplication: (cb?: Callback) => void;
  getDomain: () => string;
  openApplication: (
    params: OpenApplicationParams | Callback,
    cb?: Callback,
    settings?: Record<string, any>,
  ) => void;
  openPath: (path: string, cb?: Callback) => void;
  proxyContext: () => any; // Уточните тип, если возможно
  scrollParentWindow: (scroll: number | string, cb?: Callback) => void;
  bind: (el: HTMLElement, evname: string, func: Function) => void;
  unbind: (el: HTMLElement, evname: string, func: Function) => void;
  getScrollSize: () => { scrollWidth: number; scrollHeight: number };
  loadScript: (script: string | string[], callback?: Callback) => void;
  im: {
    callTo: (userId: string, video?: boolean) => void;
    phoneTo: (phone: string) => void;
    openMessenger: (dialogId: string) => void;
    openHistory: (dialogId: string) => void;
  };
}

declare const BX24: BX24Interface;
