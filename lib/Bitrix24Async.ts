import { loadScript } from './utils/loadScript';
import type {
  AjaxResultType,
  BatchRequestType,
  IAccess,
  IAuthInfo,
  IBX24Async,
  IBX24Vanilla,
  ISelectCRM,
  IUser,
  OpenApplicationParamsType,
  SelectCRMResponseType,
} from '../types';

export function createBitrix24Async(BX24: IBX24Vanilla): IBX24Async {
  return {
    initAsync(): Promise<void> {
      return new Promise((resolve) => {
        BX24.init(resolve);
      });
    },

    installAsync(): Promise<void> {
      return new Promise((resolve) => {
        BX24.install(resolve);
      });
    },

    refreshAuthAsync(): Promise<IAuthInfo> {
      return new Promise((resolve) => {
        BX24.refreshAuth(resolve);
      });
    },

    callBatchAsync<T, A>(
      calls: BatchRequestType<T>,
      bHaltOnError?: boolean,
    ): Promise<Record<string, AjaxResultType<T, A>> | AjaxResultType<T, A>[]> {
      return new Promise((resolve) => {
        BX24.callBatch(calls, resolve, bHaltOnError);
      });
    },

    selectUsersAsync(multiple): Promise<IUser | IUser[]> {
      return new Promise((resolve) => {
        if (multiple) {
          BX24.selectUsers(resolve);
        } else {
          BX24.selectUser(resolve);
        }
      });
    },

    selectAccessAsync(disablesValues: string[] = []): Promise<IAccess[]> {
      return new Promise((resolve) => {
        if (disablesValues.length) BX24.selectAccess(disablesValues, resolve);
        else BX24.selectAccess(resolve);
      });
    },

    selectCRMAsync(params?: ISelectCRM): Promise<SelectCRMResponseType> {
      return new Promise((resolve) => {
        if (params) BX24.selectCRM(params, resolve);
        else BX24.selectCRM(resolve);
      });
    },

    resizeWindowAsync(
      width: number | string,
      height: number | string,
    ): Promise<{ width: number; height: number }> {
      return new Promise((resolve) => {
        BX24.resizeWindow(width, height, resolve);
      });
    },

    fitWindowAsync(): Promise<{ width: number; height: number }> {
      return new Promise((resolve) => {
        BX24.fitWindow(resolve);
      });
    },

    setTitleAsync(title: string): Promise<{ title: string }> {
      return new Promise((resolve) => {
        BX24.setTitle(title, resolve);
      });
    },

    readyAsync(): Promise<void> {
      return new Promise((resolve) => {
        BX24.ready(resolve);
      });
    },

    loadScriptAsync(src: string) {
      return loadScript(src);
    },

    openApplicationAsync(params?: OpenApplicationParamsType): Promise<void> {
      return new Promise((resolve) => {
        BX24.openApplication(params, resolve);
      });
    },

    scrollParentWindowAsync(scroll: number | string): Promise<{ scroll: number }> {
      return new Promise((resolve) => {
        BX24.scrollParentWindow(scroll, resolve);
      });
    },

    openPathAsync(path: string): Promise<void> {
      return new Promise((resolve, reject) => {
        BX24.openPath(path, (response) => {
          if (response.result === 'error') reject(new Error(response.errorCode));
          resolve();
        });
      });
    },
  };
}
