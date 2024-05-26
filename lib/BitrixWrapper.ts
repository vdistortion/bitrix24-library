export class BitrixWrapper implements IBitrix24Promise {
  readonly BX24: IBitrix24;

  constructor(BX24: IBitrix24) {
    this.BX24 = BX24;
  }

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.BX24.init(resolve);
    });
  }

  install(callback: string = ''): Promise<void> {
    if (callback.length) {
      this.BX24.install(callback);
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.BX24.install(resolve);
    });
  }

  installFinish(): void {
    this.BX24.installFinish();
  }

  getAuth(): IAuth {
    return this.BX24.getAuth();
  }

  refreshAuth(): Promise<IAuth> {
    return new Promise((resolve) => {
      this.BX24.refreshAuth(resolve);
    });
  }

  callMethod(method: any, params: any, callback: any) {
    this.BX24.callMethod(method, params, callback);
  }

  callBatch(calls: TRequests, bHaltOnError: any): Promise<any> {
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
      set: (name: string, value: string): void => {
        this.BX24.userOption.set(name, value);
      },
      get: (name: string) => this.BX24.userOption.get(name),
    };
  }

  get appOption() {
    return {
      set: (name: string, value: string): Promise<void> =>
        new Promise((resolve) => {
          this.BX24.appOption.set(name, value, resolve);
        }),
      get: (name: string) => this.BX24.appOption.get(name),
    };
  }

  selectUser(): Promise<IUser> {
    return new Promise((resolve) => {
      this.BX24.selectUser(resolve);
    });
  }

  selectUsers(): Promise<IUser[]> {
    return new Promise((resolve) => {
      this.BX24.selectUsers(resolve);
    });
  }

  selectAccess(disablesValues: string[] = []): Promise<IAccess[]> {
    return new Promise((resolve) => {
      if (disablesValues.length) this.BX24.selectAccess(disablesValues, resolve);
      else this.BX24.selectAccess(resolve);
    });
  }

  selectCRM(params: ISelectCRM): Promise<ISelectCRMResponse> {
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

  isAdmin(): boolean {
    return this.BX24.isAdmin();
  }

  getLang(): string {
    return this.BX24.getLang();
  }

  resizeWindow(width: number, height: number): Promise<void> {
    return new Promise((resolve) => {
      this.BX24.resizeWindow(width, height, resolve);
    });
  }

  fitWindow(): Promise<void> {
    return new Promise((resolve) => {
      this.BX24.fitWindow(resolve);
    });
  }

  reloadWindow(): void {
    this.BX24.reloadWindow();
  }

  setTitle(title: string): Promise<void> {
    return new Promise((resolve) => {
      this.BX24.setTitle(title, resolve);
    });
  }

  ready(): Promise<void> {
    return new Promise((resolve) => {
      this.BX24.ready(resolve);
    });
  }

  isReady(): boolean {
    return this.BX24.isReady();
  }

  proxy(method: any, thisObject: any) {
    return this.BX24.proxy(method, thisObject);
  }

  closeApplication(): void {
    this.BX24.closeApplication();
  }

  getDomain(isOrigin: boolean = false): string {
    const domain = this.BX24.getDomain();
    if (isOrigin) return ['https:', domain].join('//');
    return domain;
  }

  openApplication(params: any): Promise<void> {
    return new Promise((resolve) => {
      this.BX24.openApplication(params, resolve);
    });
  }

  openPath(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.BX24.openPath(path, (response: { result: string; errorCode: string | undefined }) => {
        if (response.result === 'error') reject(new Error(response.errorCode));
        resolve();
      });
    });
  }

  proxyContext(): any {
    return this.BX24.proxyContext();
  }

  scrollParentWindow(scroll: number): Promise<void> {
    return new Promise((resolve) => {
      this.BX24.scrollParentWindow(scroll, resolve);
    });
  }

  bind(element: HTMLElement, eventName: any, callback: any) {
    this.BX24.bind(element, eventName, callback);
    return this.unbind.bind(this, element, eventName, callback);
  }

  unbind(element: HTMLElement, eventName: any, callback: any): void {
    this.BX24.unbind(element, eventName, callback);
  }

  getScrollSize() {
    return this.BX24.getScrollSize();
  }

  get im() {
    return {
      callTo: (userId: any, video: any): void => {
        this.BX24.im.callTo(userId, video);
      },
      phoneTo: (number: any): void => {
        this.BX24.im.phoneTo(number);
      },
      openMessenger: (dialogId: any): void => {
        this.BX24.im.openMessenger(dialogId);
      },
      openHistory: (dialogId: any): void => {
        this.BX24.im.openHistory(dialogId);
      },
    };
  }
}
