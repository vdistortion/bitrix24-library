import type { IsMobileOptions } from 'is-mobile';
import type { RequestMethodType, RequestParamsType, BatchRequestType } from './request.types';
import type { LangType } from './languages.types';
import type { AjaxResultType } from './ajax-result.types';

export type { AjaxResultType, LangType, BatchRequestType };

export interface IAuthInfo {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly expires_in: number;
  readonly domain: string;
  readonly member_id: string;
}

export declare interface IHandlerList {
  [key: string]: (data: any) => any;
}

export declare interface IBitrix24Batch {
  batch<T>(request: BatchRequestType<T>): Promise<any>;
}

interface IOpenApplicationParamsBase {
  bx24_width?: number;
  bx24_label?: {
    bgColor?: 'aqua' | 'green' | 'orange' | 'brown' | 'pink' | 'blue' | 'grey' | 'violet';
    text?: string;
    color?: string;
  };
  bx24_title?: string;
  bx24_leftBoundary?: number;
}

export type OpenApplicationParamsType = IOpenApplicationParamsBase &
  Partial<Record<string, unknown>>;

export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly photo: string;
  readonly position: string;
  readonly sub: boolean;
  readonly sup: boolean;
  readonly url: string;
}

export interface IAccess {
  readonly id: string;
  readonly name: string;
  readonly provider: string;
}

type EntityType = 'deal' | 'lead' | 'company' | 'contact' | 'quote';

export interface ISelectCRM {
  entityType?: EntityType[];
  multiple?: boolean;
  value?: string[] | Record<string, number[]>;
}

export type SelectCRMResponseType = {
  [key in EntityType]: Record<string, string>;
};

type OpenPathResultType =
  | { result: 'close' }
  | { result: 'error'; errorCode: 'PATH_NOT_AVAILABLE' }
  | { result: 'error'; errorCode: 'METHOD_NOT_SUPPORTED_ON_DEVICE' };

type BindType = <K extends keyof DocumentEventMap>(
  el: Element | Document | Window,
  eventName: K,
  func: (e: Event) => void,
) => void;

type FunctionType<TArgs extends any[] = any[], TResult = any> = (...args: TArgs) => TResult;

export declare interface IBX24Vanilla {
  /**
   * Инициализировать библиотеку
   *
   * [BX24.init]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-init.html}
   */
  init: (callback: () => void) => void;

  /**
   * Обработать событие первого запуска приложения пользователем
   *
   * [BX24.install]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-install.html}
   */
  install: (callback: (() => void) | string) => void;

  /**
   * Оповестить об окончании работы инсталлятора
   *
   * [BX24.installFinish]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-install-finish.html}
   */
  installFinish: () => void;

  /**
   * Получить данные для OAuth 2.0
   *
   * [BX24.getAuth]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-get-auth.html}
   */
  getAuth: () => IAuthInfo | false;

  /**
   * Обновить принудительно ключ авторизации
   *
   * [BX24.refreshAuth]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-refresh-auth.html}
   */
  refreshAuth: (callback: (refreshedAuthInfo: IAuthInfo) => void) => void;

  /**
   * Вызвать метод REST-сервиса с указанными параметрами
   *
   * [BX24.callMethod]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.html}
   */
  callMethod: <T, A>(
    method: RequestMethodType,
    params?: RequestParamsType<T>,
    callback?: (result: AjaxResultType<T, A>) => void,
  ) => void;

  /**
   * Отправить пакет запросов
   *
   * [BX24.callBatch]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-batch.html}
   */
  callBatch: <T, A>(
    calls: BatchRequestType<T>,
    callback?: (result: Record<string, AjaxResultType<T, A>> | AjaxResultType<T, A>[]) => void,
    bHaltOnError?: boolean,
  ) => void;

  /**
   * Вызвать интерфейс регистрации нового обработчика события
   *
   * [BX24.callBind]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-bind.html}
   */
  callBind: (
    event: string,
    handler: string,
    auth_type?: number | string,
    callback?: (...args: any[]) => void,
  ) => boolean | void;

  /**
   * Вызвать интерфейс удаления зарегистрированного обработчика события
   *
   * [BX24.callUnbind]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-unbind.html}
   */
  callUnbind: (
    event: string,
    handler: string,
    auth_type?: number | null,
    callback?: (...args: any[]) => void,
  ) => boolean | void;

  /**
   * Настройки текущего пользователя
   *
   * [BX24.userOption]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/options/index.html}
   */
  userOption: {
    /**
     * Установить настройки для пользователя
     *
     * [BX24.userOption.set]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/options/bx24-user-option-set.html}
     */
    set: (name: string, value: any) => void;

    /**
     * Получить настройки пользователя
     *
     * [BX24.userOption.get]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/options/bx24-user-option-get.html}
     */
    get: (name: string) => any;
  };

  /**
   * Общие настройки приложения
   *
   * [BX24.appOption]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/options/index.html}
   */
  appOption: {
    /**
     * Установить настройки для приложения
     *
     * [BX24.appOption.set]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/options/bx24-app-option-set.html}
     */
    set: (name: string, value: any, callback?: (params: Record<string, any>) => void) => void;

    /**
     * Получить настройки приложения
     *
     * [BX24.appOption.get]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/options/bx24-app-option-get.html}
     */
    get: (name: string) => any;
  };

  /**
   * Показать диалог одиночного выбора пользователя
   *
   * [BX24.selectUser]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-dialogues/bx24-select-user.html}
   */
  selectUser: (callback: (user: IUser) => void) => void;

  /**
   * Показать диалог множественного выбора пользователей
   *
   * [BX24.selectUsers]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-dialogues/bx24-select-users.html}
   */
  selectUsers: (callback: (users: IUser[]) => void) => void;

  /**
   * Показать диалог выбора прав доступа
   *
   * [BX24.selectAccess]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-dialogues/bx24-select-access.html}
   */
  selectAccess: {
    (callback: (res: IAccess[]) => void): void;
    (disabledValues: string[], callback: (res: IAccess[]) => void): void;
  };

  /**
   * Вызвать диалог выбора сущности CRM
   *
   * [BX24.selectCRM]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-dialogues/bx24-select-crm.html}
   */
  selectCRM: {
    (callback: (res: SelectCRMResponseType) => void): void;
    (config: ISelectCRM, callback: (res: SelectCRMResponseType) => void): void;
  };

  /**
   * Взаимодействие с UI из виджетов
   *
   * Scope: placement
   *
   * [BX24.placement]{@link https://apidocs.bitrix24.ru/api-reference/widgets/ui-interaction/index.html}
   */
  placement: {
    /**
     * Получить информацию о контексте вызова
     *
     * Scope: placement
     *
     * [BX24.placement.info]{@link https://apidocs.bitrix24.ru/api-reference/widgets/ui-interaction/bx24-placement-info.html}
     */
    info: <T = Record<string, any>>() => {
      placement: string;
      options: T;
    };

    /**
     * Получить информацию о js-интерфейсе текущего места встраивания
     *
     * Scope: placement
     *
     * [BX24.placement.getInterface]{@link https://apidocs.bitrix24.ru/api-reference/widgets/ui-interaction/bx24-placement-get-interface.html}
     */
    getInterface: (cb: (args: { command: string[]; event: string[] }) => void) => void;

    /**
     * Вызвать зарегистрированную команду интерфейса
     *
     * Scope: placement
     *
     * [BX24.placement.call]{@link https://apidocs.bitrix24.ru/api-reference/widgets/ui-interaction/bx24-placement-call.html}
     */
    call: {
      <T = Record<string, any>>(cmd: string, params: T, cb: (...args: any[]) => void): void;
      (cmd: string, cb: (...args: any[]) => void): void;
    };

    /**
     * Установить обработчик события интерфейса
     *
     * Scope: placement
     *
     * [BX24.placement.bindEvent]{@link https://apidocs.bitrix24.ru/api-reference/widgets/ui-interaction/bx24-placement-bind-event.html}
     */
    bindEvent: (eventName: string, cb: (callState: any) => void) => void;
  };

  /**
   * Проверить администраторский доступ пользователя
   *
   * [BX24.isAdmin]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-is-admin.html}
   */
  isAdmin: () => boolean;

  /**
   * Получить идентификатор языка текущего портала
   *
   * [BX24.getLang]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-get-lang.html}
   */
  getLang: () => LangType | string;

  /**
   * Изменить размер фрейма
   *
   * [BX24.resizeWindow]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-resize-window.html}
   */
  resizeWindow: (
    width: number | string,
    height: number | string,
    cb?: (args: { width: number; height: number }) => void,
  ) => void;

  /**
   * Подстроить размер фрейма под содержимое
   *
   * [BX24.fitWindow]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-fit-window.html}
   */
  fitWindow: (cb?: (args: { width: number; height: number }) => void) => void;

  /**
   * Перезагрузить страницу
   *
   * [BX24.reloadWindow]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-reload-window.html}
   */
  reloadWindow: () => void;

  /**
   * Установить заголовок страницы
   *
   * [BX24.setTitle]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-set-title.html}
   */
  setTitle: (title: string, cb?: (args: { title: string }) => void) => void;

  /**
   * Установить обработчик события готовности DOM-структуры документа
   *
   * [BX24.ready]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-ready.html}
   */
  ready: (handler: () => void) => void;

  /**
   * Установить флаг готовности DOM-структуры документа
   *
   * [BX24.isReady]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-is-ready.html}
   */
  isReady: () => boolean;

  /**
   * Получить прокси-функцию
   *
   * [BX24.proxy]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-proxy.html}
   */
  proxy: <T extends FunctionType, O extends object>(func: T, thisObject: O) => T;

  /**
   * Получить ссылку на оригинальный контекст выполнения прокси-функции
   *
   * [BX24.proxyContext]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-proxy-context.html}
   */
  proxyContext: <O extends object>() => O | undefined;

  /**
   * Установить функцию в качестве обработчика события
   *
   * [BX24.bind]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-bind.html}
   */
  bind: BindType;

  /**
   * Отключить функцию в качестве обработчика события
   *
   * [BX24.unbind]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-unbind.html}
   */
  unbind: BindType;

  /**
   * Получить адрес портала
   *
   * [BX24.getDomain]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-get-domain.html}
   */
  getDomain: () => string;

  /**
   * Получить размеры фрейма
   *
   * [BX24.getScrollSize]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-get-scroll-size.html}
   */
  getScrollSize: () => { scrollWidth: number; scrollHeight: number };

  /**
   * Запустить javascript-файл
   *
   * [BX24.loadScript]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-load-script.html}
   */
  loadScript: (script: string | string[], callback?: () => void) => void;

  im: {
    /**
     * Позвонить по внутренней связи
     *
     * [BX24.im.callTo]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-im-call-to.html}
     */
    callTo: (userId: number | string, video?: boolean) => void;

    /**
     * Позвонить на телефонный номер
     *
     * [BX24.im.phoneTo]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-im-phone-to.html}
     */
    phoneTo: (number: number | string) => void;

    /**
     * Открыть окно мессенджера
     *
     * [BX24.im.openMessenger]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-im-open-messenger.html}
     */
    openMessenger: (dialogId?: number | string) => void;

    /**
     * Открыть окно истории
     *
     * [BX24.im.openHistory]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-im-open-history.html}
     */
    openHistory: (dialogId: number | string) => void;
  };

  /**
   * Открыть всплывающее окно с фреймом приложения
   *
   * [BX24.openApplication]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-open-application.html}
   */
  openApplication: {
    (cb?: () => void): void;
    (parameters?: OpenApplicationParamsType, cb?: () => void): void;
  };

  /**
   * Закрыть окно с приложением
   *
   * [BX24.closeApplication]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-close-application.html}
   */
  closeApplication: () => void;

  /**
   * Прокрутить родительское окно, 0 - прокрутить к самому началу
   *
   * [BX24.scrollParentWindow]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-scroll-parent-window.html}
   */
  scrollParentWindow: (scroll: number | string, cb?: (arg: { scroll: number }) => void) => void;

  /**
   * Открыть путь в слайдере
   *
   * [BX24.openPath]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-open-path.html}
   */
  openPath: (path: string, cb?: (result: OpenPathResultType) => void) => void;
}

export declare interface IBX24Async {
  initAsync: () => Promise<void>;
  installAsync: () => Promise<void>;
  refreshAuthAsync: () => Promise<IAuthInfo>;
  callBatchAsync: <T, A>(
    calls: BatchRequestType<T>,
    bHaltOnError?: boolean,
  ) => Promise<Record<string, AjaxResultType<T, A>> | AjaxResultType<T, A>[]>;
  selectUsersAsync: (multiple?: boolean) => Promise<IUser | IUser[]>;
  selectAccessAsync: (disablesValues?: string[]) => Promise<IAccess[]>;
  selectCRMAsync: (config?: ISelectCRM) => Promise<SelectCRMResponseType>;
  resizeWindowAsync: (
    width: number | string,
    height: number | string,
  ) => Promise<{ width: number; height: number }>;
  fitWindowAsync: () => Promise<{ width: number; height: number }>;
  setTitleAsync: (title: string) => Promise<{ title: string }>;
  readyAsync: () => Promise<void>;
  loadScriptAsync: (src: string) => Promise<HTMLScriptElement>;
  openApplicationAsync: (params?: OpenApplicationParamsType) => Promise<void>;
  scrollParentWindowAsync: (scroll: number | string) => Promise<{ scroll: number }>;
  openPathAsync: (path: string) => Promise<void>;
}

export declare interface IBX24Extended {
  /**
   * Check if mobile browser, based on useragent string.
   *
   * [is-mobile]{@link https://www.npmjs.com/package/is-mobile}
   */
  isMobile: (opts?: IsMobileOptions) => boolean;

  /**
   * [Использование метода .createBatch()](@link https://github.com/vdistortion/bitrix24-library/blob/master/BATCH.md}
   */
  createBatch: (
    handlerList?: IHandlerList | undefined,
    BatchClass?: IBitrix24Batch | undefined,
  ) => IBitrix24Batch;
}

export declare type IBX24 = IBX24Vanilla & IBX24Async & IBX24Extended;

declare global {
  interface Window {
    BX24: IBX24Vanilla;
  }
}

export declare function Bitrix24(): Promise<IBX24>;
