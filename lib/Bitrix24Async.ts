import { loadScript } from './utils/loadScript';
import type { IBitrix24, IBitrix24Async, RequestType } from '../types';
import { AjaxResultType } from '../types/request.types.ts';

export function createBitrix24Async(BX24: IBitrix24): IBitrix24Async {
  return {
    initAsync() {
      return new Promise((resolve) => {
        BX24.init(resolve);
      });
    },

    installAsync() {
      return new Promise((resolve) => {
        BX24.install(resolve);
      });
    },

    refreshAuthAsync() {
      return new Promise((resolve) => {
        BX24.refreshAuth(resolve);
      });
    },

    // @ts-ignore
    callBatchAsync<R, P extends object>(
      calls: RequestType<P>[] | Record<string, RequestType<P>>,
      bHaltOnError?: boolean,
    ): Promise<AjaxResultType<R, P>[] | Record<string, AjaxResultType<R, P>>> {
      return new Promise((resolve) => {
        if (Array.isArray(calls)) {
          BX24.callBatch<R, P>(
            calls,
            resolve as (result: AjaxResultType<R, P>[]) => void,
            bHaltOnError,
          );
        } else {
          BX24.callBatch<R, P>(
            calls,
            resolve as (result: Record<string, AjaxResultType<R, P>>) => void,
            bHaltOnError,
          );
        }
      });
    },

    selectUsersAsync(multiple) {
      return new Promise((resolve) => {
        if (multiple) {
          BX24.selectUsers(resolve);
        } else {
          BX24.selectUser(resolve);
        }
      });
    },

    selectAccessAsync(disablesValues = []) {
      return new Promise((resolve) => {
        if (disablesValues.length) BX24.selectAccess(disablesValues, resolve);
        else BX24.selectAccess(resolve);
      });
    },

    selectCRMAsync(params) {
      return new Promise((resolve) => {
        if (params) BX24.selectCRM(params, resolve);
        else BX24.selectCRM(resolve);
      });
    },

    resizeWindowAsync(width, height) {
      return new Promise((resolve) => {
        BX24.resizeWindow(width, height, resolve);
      });
    },

    fitWindowAsync() {
      return new Promise((resolve) => {
        BX24.fitWindow(resolve);
      });
    },

    setTitleAsync(title) {
      return new Promise((resolve) => {
        BX24.setTitle(title, resolve);
      });
    },

    readyAsync() {
      return new Promise((resolve) => {
        BX24.ready(resolve);
      });
    },

    loadScriptAsync(src) {
      return loadScript(src);
    },

    openApplicationAsync(params, settings) {
      return new Promise((resolve) => {
        BX24.openApplication(params, resolve, settings);
      });
    },

    scrollParentWindowAsync(scroll) {
      return new Promise((resolve) => {
        BX24.scrollParentWindow(scroll, resolve);
      });
    },

    openPathAsync(path) {
      return new Promise((resolve, reject) => {
        BX24.openPath(path, (response) => {
          if (response.result === 'error') reject(new Error(response.errorCode));
          resolve();
        });
      });
    },
  };
}
