export class BitrixWrapper {
  protected readonly BX24: any = null;

  constructor(BX24: any) {
    this.BX24 = BX24;
  }

  init() {
    return new Promise((resolve) => {
      this.BX24.init(resolve);
    });
  }

  install(callback: any) {
    if (typeof callback === 'string') {
      this.BX24.install(callback);
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.BX24.install(resolve);
    });
  }

  installFinish() {
    this.BX24.installFinish();
  }

  getAuth() {
    return this.BX24.getAuth();
  }

  refreshAuth() {
    return new Promise((resolve) => {
      this.BX24.refreshAuth(resolve);
    });
  }

  callMethod(method: any, params: any, callback: any) {
    this.BX24.callMethod(method, params, callback);
  }

  callBatch(calls: any, bHaltOnError: any) {
    return new Promise((resolve) => {
      this.BX24.callBatch(calls, resolve, bHaltOnError);
    });
  }

  callBind(event: any, handler: any, authType: any, callback: any) {
    this.BX24.callBind(event, handler, authType, callback);
    return this.callUnbind.bind(this, event, handler, authType, callback);
  }

  callUnbind(event: any, handler: any, authType: any, callback: any) {
    this.BX24.callUnbind(event, handler, authType, callback);
  }

  get userOption() {
    return {
      set: (name: any, value: any) => {
        this.BX24.userOption.set(name, value);
      },
      get: (name: any) => this.BX24.userOption.get(name),
    };
  }

  get appOption() {
    return {
      set: (name: any, value: any) =>
        new Promise((resolve) => {
          this.BX24.appOption.set(name, value, resolve);
        }),
      get: (name: any) => this.BX24.appOption.get(name),
    };
  }

  selectUser() {
    return new Promise((resolve) => {
      this.BX24.selectUser(resolve);
    });
  }

  selectUsers() {
    return new Promise((resolve) => {
      this.BX24.selectUsers(resolve);
    });
  }

  selectAccess(value: any) {
    return new Promise((resolve) => {
      if (Array.isArray(value)) this.BX24.selectAccess(value, resolve);
      else this.BX24.selectAccess(resolve);
    });
  }

  selectCRM(params = {}) {
    return new Promise((resolve) => {
      this.BX24.selectCRM(params, resolve);
    });
  }

  get placement() {
    return {
      bindEvent: (eventName: any) =>
        new Promise((resolve) => {
          this.BX24.placement.bindEvent(eventName, resolve);
        }),
      call: (command: any, params: any) =>
        new Promise((resolve) => {
          this.BX24.placement.call(command, params, resolve);
        }),
      getInterface: () =>
        new Promise((resolve) => {
          this.BX24.placement.getInterface(resolve);
        }),
      info: () => this.BX24.placement.info(),
    };
  }

  isAdmin() {
    return this.BX24.isAdmin();
  }

  getLang() {
    return this.BX24.getLang();
  }

  resizeWindow(width: any, height: any) {
    return new Promise((resolve) => {
      this.BX24.resizeWindow(width, height, resolve);
    });
  }

  fitWindow() {
    return new Promise((resolve) => {
      this.BX24.fitWindow(resolve);
    });
  }

  reloadWindow() {
    this.BX24.reloadWindow();
  }

  setTitle(title = '') {
    return new Promise((resolve) => {
      this.BX24.setTitle(title, resolve);
    });
  }

  ready() {
    return new Promise((resolve) => {
      this.BX24.ready(resolve);
    });
  }

  isReady() {
    return this.BX24.isReady();
  }

  proxy(method: any, thisObject: any) {
    return this.BX24.proxy(method, thisObject);
  }

  closeApplication() {
    this.BX24.closeApplication();
  }

  getDomain(isOrigin: boolean) {
    const domain = this.BX24.getDomain();
    if (isOrigin) return ['https:', domain].join('//');
    return domain;
  }

  openApplication(params: any) {
    return new Promise((resolve) => {
      this.BX24.openApplication(params, resolve);
    });
  }

  openPath(path: unknown) {
    return new Promise((resolve, reject) => {
      this.BX24.openPath(path, (response: { result: string; errorCode: string | undefined }) => {
        if (response.result === 'error') reject(new Error(response.errorCode));
        resolve(path);
      });
    });
  }

  proxyContext() {
    return this.BX24.proxyContext();
  }

  scrollParentWindow(scroll: any) {
    return new Promise((resolve) => {
      this.BX24.scrollParentWindow(scroll, resolve);
    });
  }

  bind(element: any, eventName: any, callback: any) {
    this.BX24.bind(element, eventName, callback);
    return this.unbind.bind(this, element, eventName, callback);
  }

  unbind(element: any, eventName: any, callback: any) {
    this.BX24.unbind(element, eventName, callback);
  }

  getScrollSize() {
    return this.BX24.getScrollSize();
  }

  get im() {
    return {
      callTo: (userId: any, video: any) => {
        this.BX24.im.callTo(userId, video);
      },
      phoneTo: (number: any) => {
        this.BX24.im.phoneTo(number);
      },
      openMessenger: (dialogId: any) => {
        this.BX24.im.openMessenger(dialogId);
      },
      openHistory: (dialogId: any) => {
        this.BX24.im.openHistory(dialogId);
      },
    };
  }
}
