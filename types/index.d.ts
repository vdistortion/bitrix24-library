import type { IsMobileOptions } from 'is-mobile';
import type { AjaxResultType, RequestMethodType, RequestType } from './request.types';
import type { LangType } from './languages.types';
import type {
  OpenApplicationParamsType,
  OpenApplicationSettingsType,
} from './application-params.types';
import type { SelectCRMType, SelectCRMResponseType } from './select-crm.types';

export type { LangType, RequestType };

export interface IAuthInfo {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly expires_in: number;
  readonly domain: string;
  readonly member_id: string;
}

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

type OpenPathResultType =
  | { result: 'close' }
  | { result: 'error'; errorCode: 'PATH_NOT_AVAILABLE' }
  | { result: 'error'; errorCode: 'METHOD_NOT_SUPPORTED_ON_DEVICE' };

type BindType = <K extends keyof DocumentEventMap>(
  el: Element | Document | Window,
  eventName: K,
  func: (e: Event) => void,
) => void;

type CallBindType = <T>(
  event:
    | 'onAppInstall'
    | 'onAppUninstall'
    | 'onAppMethodConfirm'
    | 'onAppPayment'
    | 'onAppUserAdd'
    | string,
  handler: string,
  auth_type?: number | string | null,
  cb?: (result: T) => void,
) => boolean | void;

export declare interface IBitrix24 {
  /**
   * Инициализировать библиотеку
   *
   * [BX24.init]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-init.html}
   */
  init(cb: () => void): void;

  /**
   * Обработать событие первого запуска приложения пользователем
   *
   * [BX24.install]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-install.html}
   */
  install(cb: (() => void) | string): void;

  /**
   * Оповестить об окончании работы инсталлятора
   *
   * [BX24.installFinish]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-install-finish.html}
   */
  installFinish(): void;

  /**
   * Получить данные для OAuth 2.0
   *
   * [BX24.getAuth]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-get-auth.html}
   */
  getAuth(): IAuthInfo | false;

  /**
   * Обновить принудительно ключ авторизации
   *
   * [BX24.refreshAuth]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-functions/bx24-refresh-auth.html}
   */
  refreshAuth(cb: (refreshedAuthInfo: IAuthInfo) => void): void;

  /**
   * Вызвать метод REST-сервиса с указанными параметрами
   *
   * [BX24.callMethod]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.html}
   */
  callMethod<R, P extends object>(
    method: RequestMethodType,
    params?: P,
    cb?: (result: AjaxResultType<R, P>) => void,
  ): void;

  /**
   * Отправить пакет запросов
   *
   * [BX24.callBatch]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-batch.html}
   */
  callBatch<R, P extends object = null>(
    calls: RequestType<P>[],
    cb?: (result: AjaxResultType<R, P>[]) => void,
    bHaltOnError?: boolean,
  ): void;
  callBatch<R, P extends object = null>(
    calls: Record<string, RequestType<P>>,
    cb?: (result: Record<string, AjaxResultType<R, P>>) => void,
    bHaltOnError?: boolean,
  ): void;

  /**
   * Вызвать интерфейс регистрации нового обработчика события
   *
   * [BX24.callBind]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-bind.html}
   */
  callBind: CallBindType;

  /**
   * Вызвать интерфейс удаления зарегистрированного обработчика события
   *
   * [BX24.callUnbind]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/how-to-call-rest-methods/bx24-call-unbind.html}
   */
  callUnbind: CallBindType;

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
    set<T>(name: string, value: T): void;

    /**
     * Получить настройки пользователя
     *
     * [BX24.userOption.get]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/options/bx24-user-option-get.html}
     */
    get<T>(name: string): T;
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
    set<T, P = Record<string, unknown>>(name: string, value: T, cb?: (params: P) => void): void;

    /**
     * Получить настройки приложения
     *
     * [BX24.appOption.get]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/options/bx24-app-option-get.html}
     */
    get<T>(name: string): T;
  };

  /**
   * Показать диалог одиночного выбора пользователя
   *
   * [BX24.selectUser]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-dialogues/bx24-select-user.html}
   */
  selectUser(cb: (user: IUser) => void): void;

  /**
   * Показать диалог множественного выбора пользователей
   *
   * [BX24.selectUsers]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-dialogues/bx24-select-users.html}
   */
  selectUsers(cb: (users: IUser[]) => void): void;

  /**
   * Показать диалог выбора прав доступа
   *
   * [BX24.selectAccess]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-dialogues/bx24-select-access.html}
   */
  selectAccess(disabledValues: string[], cb: (res: IAccess[]) => void): void;
  selectAccess(cb: (res: IAccess[]) => void): void;

  /**
   * Вызвать диалог выбора сущности CRM
   *
   * [BX24.selectCRM]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/system-dialogues/bx24-select-crm.html}
   */
  selectCRM(config: SelectCRMType, cb: (res: SelectCRMResponseType) => void): void;
  selectCRM(cb: (res: SelectCRMResponseType) => void): void;

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
    info<T = Record<string, unknown>>(): {
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
    getInterface(cb: (result: { command: string[]; event: string[] }) => void): void;

    /**
     * Вызвать зарегистрированную команду интерфейса
     *
     * Scope: placement
     *
     * [BX24.placement.call]{@link https://apidocs.bitrix24.ru/api-reference/widgets/ui-interaction/bx24-placement-call.html}
     */
    call<T>(cmd: string, params: T, cb: (result: unknown) => void): void;
    call(cmd: string, cb: (result: unknown) => void): void;

    /**
     * Установить обработчик события интерфейса
     *
     * Scope: placement
     *
     * [BX24.placement.bindEvent]{@link https://apidocs.bitrix24.ru/api-reference/widgets/ui-interaction/bx24-placement-bind-event.html}
     */
    bindEvent(eventName: string, cb: (callState: unknown) => void): void;
  };

  /**
   * Проверить администраторский доступ пользователя
   *
   * [BX24.isAdmin]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-is-admin.html}
   */
  isAdmin(): boolean;

  /**
   * Получить идентификатор языка текущего портала
   *
   * [BX24.getLang]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-get-lang.html}
   */
  getLang(): LangType;

  /**
   * Изменить размер фрейма
   *
   * [BX24.resizeWindow]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-resize-window.html}
   */
  resizeWindow(
    width: number | string,
    height: number | string,
    cb?: (args: { width: number; height: number }) => void,
  ): void;

  /**
   * Подстроить размер фрейма под содержимое
   *
   * [BX24.fitWindow]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-fit-window.html}
   */
  fitWindow(cb?: (args: { width: number; height: number }) => void): void;

  /**
   * Перезагрузить страницу
   *
   * [BX24.reloadWindow]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-reload-window.html}
   */
  reloadWindow(): void;

  /**
   * Установить заголовок страницы
   *
   * [BX24.setTitle]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-set-title.html}
   */
  setTitle(title: string, cb?: (args: { title: string }) => void): void;

  /**
   * Установить обработчик события готовности DOM-структуры документа
   *
   * [BX24.ready]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-ready.html}
   */
  ready(handler: () => void): void;

  /**
   * Установить флаг готовности DOM-структуры документа
   *
   * [BX24.isReady]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-is-ready.html}
   */
  isReady(): boolean;

  /**
   * Получить прокси-функцию
   *
   * [BX24.proxy]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-proxy.html}
   */
  proxy<F extends Function, O extends object>(func: F, thisObject: O): F;

  /**
   * Получить ссылку на оригинальный контекст выполнения прокси-функции
   *
   * [BX24.proxyContext]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-proxy-context.html}
   */
  proxyContext(): object | undefined;

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
  getDomain(): string;

  /**
   * Получить размеры фрейма
   *
   * [BX24.getScrollSize]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-get-scroll-size.html}
   */
  getScrollSize(): { scrollWidth: number; scrollHeight: number };

  /**
   * Запустить javascript-файл
   *
   * [BX24.loadScript]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-load-script.html}
   */
  loadScript(script: string | string[], cb?: () => void): void;

  im: {
    /**
     * Позвонить по внутренней связи
     *
     * [BX24.im.callTo]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-im-call-to.html}
     */
    callTo(userId: number | string, video?: boolean): void;

    /**
     * Позвонить на телефонный номер
     *
     * [BX24.im.phoneTo]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-im-phone-to.html}
     */
    phoneTo(number: number | string): void;

    /**
     * Открыть окно мессенджера
     *
     * [BX24.im.openMessenger]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-im-open-messenger.html}
     */
    openMessenger(dialogId?: number | string): void;

    /**
     * Открыть окно истории
     *
     * [BX24.im.openHistory]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-im-open-history.html}
     */
    openHistory(dialogId: number | string): void;
  };

  /**
   * Открыть всплывающее окно с фреймом приложения
   *
   * [BX24.openApplication]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-open-application.html}
   */
  openApplication<T = Record<string, unknown>>(
    params?: OpenApplicationParamsType & T,
    cb?: () => void,
    settings?: OpenApplicationSettingsType,
  ): void;
  openApplication(cb?: () => void): void;

  /**
   * Закрыть окно с приложением
   *
   * [BX24.closeApplication]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-close-application.html}
   */
  closeApplication(): void;

  /**
   * Прокрутить родительское окно
   *
   * [BX24.scrollParentWindow]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-scroll-parent-window.html}
   */
  scrollParentWindow(scroll: number | string, cb?: (arg: { scroll: number }) => void): void;

  /**
   * Открыть путь в слайдере
   *
   * [BX24.openPath]{@link https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/additional-functions/bx24-open-path.html}
   */
  openPath(path: string, cb?: (result: OpenPathResultType) => void): void;
}

export declare interface IBitrix24Async {
  /**
   * Инициализировать библиотеку
   *
   * Оригинальный метод: [BX24.init]{@link IBitrix24.init}
   */
  initAsync(): Promise<void>;

  /**
   * Обработать событие первого запуска приложения пользователем
   *
   * Оригинальный метод: [BX24.install]{@link IBitrix24.install}
   */
  installAsync(): Promise<void>;

  /**
   * Обновить принудительно ключ авторизации
   *
   * Оригинальный метод: [BX24.refreshAuth]{@link IBitrix24.refreshAuth}
   */
  refreshAuthAsync(): Promise<IAuthInfo>;

  /**
   * Отправить пакет запросов
   *
   * Оригинальный метод: [BX24.callBatch]{@link IBitrix24.callBatch}
   */
  callBatchAsync<R, P extends object = null>(
    calls: RequestType<P>[],
    bHaltOnError?: boolean,
  ): Promise<AjaxResultType<R, P>[]>;
  callBatchAsync<R, P extends object = null>(
    calls: Record<string, RequestType<P>>,
    bHaltOnError?: boolean,
  ): Promise<Record<string, AjaxResultType<R, P>>>;

  /**
   * Показать диалог множественного выбора пользователей
   *
   * Оригинальные методы: [BX24.selectUser]{@link IBitrix24.selectUser} и [BX24.selectUsers]{@link IBitrix24.selectUsers}
   */
  selectUsersAsync(multiple?: boolean): Promise<IUser | IUser[]>;

  /**
   * Показать диалог выбора прав доступа
   *
   * Оригинальный метод: [BX24.selectAccess]{@link IBitrix24.selectAccess}
   */
  selectAccessAsync(disablesValues?: string[]): Promise<IAccess[]>;

  /**
   * Вызвать диалог выбора сущности CRM
   *
   * Оригинальный метод: [BX24.selectCRM]{@link IBitrix24.selectCRM}
   */
  selectCRMAsync(config?: SelectCRMType): Promise<SelectCRMResponseType>;

  /**
   * Изменить размер фрейма
   *
   * Оригинальный метод: [BX24.resizeWindow]{@link IBitrix24.resizeWindow}
   */
  resizeWindowAsync(
    width: number | string,
    height: number | string,
  ): Promise<{ width: number; height: number }>;

  /**
   * Подстроить размер фрейма под содержимое
   *
   * Оригинальный метод: [BX24.fitWindow]{@link IBitrix24.fitWindow}
   */
  fitWindowAsync(): Promise<{ width: number; height: number }>;

  /**
   * Установить заголовок страницы
   *
   * Оригинальный метод: [BX24.setTitle]{@link IBitrix24.setTitle}
   */
  setTitleAsync(title: string): Promise<{ title: string }>;

  /**
   * Установить обработчик события готовности DOM-структуры документа
   *
   * Оригинальный метод: [BX24.ready]{@link IBitrix24.ready}
   */
  readyAsync(): Promise<void>;

  /**
   * Загрузить javascript-файл
   * @param {string} src - путь до скрипта
   * @return {Promise<HTMLScriptElement>} HTML-элемент
   */
  loadScriptAsync(src: string): Promise<HTMLScriptElement>;

  /**
   * Открыть всплывающее окно с фреймом приложения
   *
   * Оригинальный метод: [BX24.openApplication]{@link IBitrix24.openApplication}
   */
  openApplicationAsync<T = Record<string, unknown>>(
    params?: OpenApplicationParamsType & T,
    settings?: OpenApplicationSettingsType,
  ): Promise<void>;

  /**
   * Прокрутить родительское окно
   *
   * Оригинальный метод: [BX24.scrollParentWindow]{@link IBitrix24.scrollParentWindow}
   */
  scrollParentWindowAsync(scroll: number | string): Promise<{ scroll: number }>;

  /**
   * Открыть путь в слайдере
   *
   * Оригинальный метод: [BX24.openPath]{@link IBitrix24.openPath}
   */
  openPathAsync(path: string): Promise<void>;
}

export type HandlerListType = Record<string, Function>;

export type BatchType = {
  batch<T>(request: Record<string, RequestType<T>>): Promise<unknown>;
  batch<T>(request: RequestType<T>[]): Promise<unknown>;
};

export declare interface IBitrix24Extended {
  /**
   * Check if mobile browser, based on useragent string.
   *
   * [is-mobile]{@link https://www.npmjs.com/package/is-mobile}
   */
  isMobile(opts?: IsMobileOptions): boolean;

  /**
   * [Использование метода .createBatch()]{@link https://github.com/vdistortion/bitrix24-library/blob/master/BATCH.md}
   */
  createBatch(handlerList?: HandlerListType): BatchType;
}

export declare type IBitrix24Library = IBitrix24 & IBitrix24Async & IBitrix24Extended;

declare global {
  interface Window {
    BX24: IBitrix24;
  }
}

export declare function Bitrix24(): Promise<IBitrix24Library>;
