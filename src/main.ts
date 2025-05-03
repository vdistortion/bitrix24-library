import { Bitrix24 } from '../lib';
import type { IBitrix24Library } from '../types';
import { buttons, callback } from './dom';
import './styles.css';

const BX24: IBitrix24Library = await Bitrix24();
console.log(BX24, window.BX24);

const [info] = await BX24.callBatchAsync<{ ID: number }>([['app.info']]);
const appInfo = info.data();
const link = `/marketplace/view/${appInfo.ID}/`;
const placement = 'REST_APP_URI';
const handler = [window.location.origin, 'index.html'].join('/');
console.log(link);

BX24.install('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');

BX24.install(() => {
  console.log('install');
  BX24.installFinish();
});

BX24.installAsync().then(() => {
  console.log('installAsync');
  BX24.installFinish();
});

BX24.bind(buttons.init, 'click', () => {
  BX24.init(() => {
    console.log('init');
  });
});

BX24.bind(buttons.initAsync, 'click', () => {
  BX24.initAsync().then(() => {
    console.log('initAsync');
  });
});

BX24.bind(buttons.getAuth, 'click', () => {
  const info = BX24.getAuth();
  console.log(info);
});

BX24.bind(buttons.refreshAuth, 'click', () => {
  BX24.refreshAuth((authInfo) => {
    console.log(authInfo);
  });
});

BX24.bind(buttons.refreshAuthAsync, 'click', () => {
  BX24.refreshAuthAsync().then((authInfo) => {
    console.log(authInfo);
  });
});

BX24.bind(buttons.callMethod, 'click', () => {
  BX24.callMethod('method.get', {}, (result) => {
    console.info(result);
    console.log('data', result.data());
    console.log('error', result.error());
    console.log('error_description', result.error_description());
    console.log('more', result.more());
    console.log('total', result.total());
    console.log('next', result.next());
  });
});

BX24.bind(buttons.callBatch, 'click', () => {
  BX24.callBatch([['user.get']], (args) => console.info(args));
  BX24.callBatch(
    {
      user: ['user.get'],
    },
    (args) => console.info(args),
  );
});

BX24.bind(buttons.callBatchAsync, 'click', () => {
  BX24.callBatchAsync([['user.get']]).then((args) => console.info(args));
  BX24.callBatchAsync({
    user: ['user.get'],
  }).then((args) => console.info(args));
});

BX24.bind(buttons.callBind, 'click', () => {
  BX24.callBind<string>('onAppUninstall', 'console.log', 2, (result) => {
    console.log(result);
  });
});

BX24.bind(buttons.callUnbind, 'click', () => {
  BX24.callUnbind('OnAppUninstall', 'console.log', 2, (result) => {
    console.log(result);
  });
});

BX24.bind(buttons['userOption.set'], 'click', () => {
  BX24.userOption.set<string>('userOption_1', 'user1');
  BX24.userOption.set<number[]>('userOption_2', [42]);
});

BX24.bind(buttons['userOption.get'], 'click', () => {
  const value = BX24.userOption.get<string>('userOption_1');
  console.log('userOption.get', value);
  console.log('userOption.get', BX24.userOption.get('userOption_2'));
});

BX24.bind(buttons['appOption.set'], 'click', () => {
  BX24.appOption.set<string>('appOption_1', 'app#1', (options) => {
    console.log('BX24.appOption.set', options);
  });
  BX24.appOption.set<string, Record<string, string>>('appOption_2', 'app$2', (options) => {
    console.log('BX24.appOption.set', options);
  });
});

BX24.bind(buttons['appOption.get'], 'click', () => {
  const value = BX24.appOption.get<string>('appOption_1');
  console.log('appOption.get', value);
  console.log('appOption.get', BX24.appOption.get('appOption_2'));
});

BX24.bind(buttons.selectUser, 'click', () => {
  BX24.selectUser((user) => console.log(user));
});

BX24.bind(buttons.selectUsers, 'click', () => {
  BX24.selectUsers((users) => console.log(users));
});

BX24.bind(buttons.selectUsersAsync, 'click', () => {
  // BX24.selectUsersAsync().then((user) => console.log(user));
  BX24.selectUsersAsync(true).then((users) => console.log(users));
});

BX24.bind(buttons.selectAccess, 'click', () => {
  // BX24.selectAccess([], (access) => console.log(access));
  BX24.selectAccess((access) => console.log(access));
});

BX24.bind(buttons.selectAccessAsync, 'click', () => {
  BX24.selectAccessAsync().then((access) => console.log(access));
});

BX24.bind(buttons.selectCRM, 'click', () => {
  // BX24.selectCRM((crm) => console.log(crm));
  BX24.selectCRM({ entityType: ['deal', 'company'], multiple: true }, (crm) => console.log(crm));
});

BX24.bind(buttons.selectCRMAsync, 'click', () => {
  // BX24.selectCRMAsync().then((crm) => console.log(crm));
  BX24.selectCRMAsync({ entityType: ['deal', 'company'], multiple: true }).then((crm) =>
    console.log(crm),
  );
});

BX24.bind(buttons['placement.info'], 'click', () => {
  console.log(BX24.placement.info());
});

BX24.bind(buttons['placement.getInterface'], 'click', () => {
  BX24.placement.getInterface((a) => {
    console.log(a);
  });
});

BX24.bind(buttons['placement.call'], 'click', () => {
  BX24.placement.call<{ title: string }>('showHelper', { title: '' }, (result) => {
    console.log(result);
  });
});

BX24.bind(buttons['placement.bindEvent'], 'click', () => {
  BX24.placement.bindEvent('BackgroundCallCard::initialized', (result) => {
    console.log(result);
  });

  BX24.placement.bindEvent('CallCard::CallStateChanged', (callState) => {
    console.log(callState);
  });
});

BX24.bind(buttons['placement.bind'], 'click', () => {
  BX24.callMethod(
    'placement.bind',
    {
      PLACEMENT: placement,
      HANDLER: handler,
    },
    (result) => {
      console.log(result);
      BX24.openPath(link);
    },
  );
});

BX24.bind(buttons['placement.unbind'], 'click', () => {
  BX24.callMethod(
    'placement.unbind',
    {
      PLACEMENT: placement,
      HANDLER: handler,
    },
    (result) => {
      console.log(result);
    },
  );
});

BX24.bind(buttons.isAdmin, 'click', () => {
  console.log(BX24.isAdmin());
});

BX24.bind(buttons.getLang, 'click', () => {
  const lang = BX24.getLang();
  console.log(lang, lang === 'de');
});

BX24.bind(buttons.resizeWindow, 'click', () => {
  // BX24.resizeWindow('700', 500);
  BX24.resizeWindow('700', 500, (args) => {
    console.log(args);
  });
});

BX24.bind(buttons.resizeWindowAsync, 'click', () => {
  // BX24.resizeWindowAsync('700', 500);
  BX24.resizeWindowAsync('700', 500).then((args) => {
    console.log(args);
  });
});

BX24.bind(buttons.fitWindow, 'click', () => {
  // BX24.fitWindow();
  BX24.fitWindow((args) => {
    console.log(args);
  });
});

BX24.bind(buttons.fitWindowAsync, 'click', () => {
  BX24.fitWindowAsync().then((args) => {
    console.log(args);
  });
});

BX24.bind(buttons.reloadWindow, 'click', () => {
  BX24.reloadWindow();
});

BX24.bind(buttons.setTitle, 'click', () => {
  // BX24.setTitle('New Title');
  BX24.setTitle('New Title', (args) => {
    console.log(args);
  });
});

BX24.bind(buttons.setTitleAsync, 'click', () => {
  // BX24.setTitleAsync('New Title Async');
  BX24.setTitleAsync('New Title Async').then((args) => {
    console.log(args);
  });
});

BX24.bind(buttons.ready, 'click', () => {
  BX24.ready(() => {
    console.log('DOM-структура документа готова к работе');
    console.log(BX24.isReady());
  });
});

BX24.bind(buttons.readyAsync, 'click', () => {
  BX24.readyAsync().then(() => {
    console.log('DOM-структура документа готова к работе');
    console.log(BX24.isReady());
  });
});

BX24.bind(buttons.isReady, 'click', () => {
  console.log('isReady', BX24.isReady());
});

BX24.bind(buttons.proxy, 'click', function () {
  type FuncType = (arg: string) => string;
  const a: { f: FuncType } = {
    f(args) {
      console.log('proxy', this);
      console.log(BX24.proxyContext());
      return args;
    },
  };

  const func = BX24.proxy<FuncType, Element>(a.f, buttons.proxy);

  const b = func('proxyContext');
  console.log(b);
  console.log(BX24.proxyContext());
});

BX24.bind(buttons.bind, 'click', callback);

BX24.bind(buttons.unbind, 'click', (e: Event) => {
  console.log(e.target);
  BX24.unbind(buttons.bind, 'click', callback);
});

BX24.bind(buttons.getDomain, 'click', () => {
  console.log(BX24.getDomain());
});

BX24.bind(buttons.getScrollSize, 'click', () => {
  const sizes = BX24.getScrollSize();
  console.log(sizes);
});

BX24.bind(buttons.loadScript, 'click', () => {
  // @ts-ignore
  console.log(window._);

  // BX24.loadScript('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
  // BX24.loadScript(['https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js']);
  BX24.loadScript(['https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'], () => {
    // @ts-ignore
    console.log(window._);
  });
});

BX24.bind(buttons.loadScriptAsync, 'click', () => {
  // @ts-ignore
  console.log(window._);

  BX24.loadScriptAsync('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js').then(
    (element) => {
      // @ts-ignore
      console.log(window._, element);
    },
  );
});

BX24.bind(buttons['im.callTo'], 'click', () => {
  BX24.im.callTo(1);
  // BX24.im.callTo('1', true);
});

BX24.bind(buttons['im.phoneTo'], 'click', () => {
  BX24.im.phoneTo('89');
});

BX24.bind(buttons['im.openMessenger'], 'click', () => {
  BX24.im.openMessenger('1');
});

BX24.bind(buttons['im.openHistory'], 'click', () => {
  BX24.im.openHistory(1);
});

BX24.bind(buttons.openApplication, 'click', () => {
  // BX24.openApplication();
  // BX24.openApplication(() => {
  //   console.log('Application closed!');
  // });
  // BX24.openApplication<{ opened: boolean }>(
  //   {
  //     opened: true,
  //     bx24_label: {
  //       bgColor: 'violet',
  //     },
  //     bx24_leftBoundary: 500,
  //     bx24_width: 300,
  //   },
  //   () => {
  //     console.log('Application closed!');
  //   },
  // );
  BX24.openApplication<{ opened: boolean }>(
    {
      opened: true,
    },
    () => {
      console.log('Application closed!');
    },
    {
      label: {
        bgColor: 'violet',
      },
      leftBoundary: 500,
      width: 300,
    },
  );
});

BX24.bind(buttons.openApplicationAsync, 'click', () => {
  // BX24.openApplicationAsync();
  // BX24.openApplicationAsync().then(() => {
  //   console.log('Application closed!');
  // });
  // BX24.openApplicationAsync<{ opened: boolean }>({
  //   opened: true,
  //   bx24_label: {
  //     bgColor: 'violet',
  //   },
  //   bx24_leftBoundary: 500,
  //   bx24_width: 300,
  // }).then(() => {
  //   console.log('Application closed!');
  // });
  BX24.openApplicationAsync<{ opened: boolean }>(
    {
      opened: true,
    },
    {
      label: {
        bgColor: 'violet',
      },
      leftBoundary: 500,
      width: 300,
    },
  ).then(() => {
    console.log('Application closed!');
  });
});

BX24.bind(buttons.closeApplication, 'click', () => {
  BX24.closeApplication();
});

BX24.bind(buttons.scrollParentWindow, 'click', () => {
  BX24.scrollParentWindow(0);
  BX24.scrollParentWindow('42', (args) => {
    console.log(args);
  });
});

BX24.bind(buttons.scrollParentWindowAsync, 'click', async () => {
  await BX24.scrollParentWindowAsync(0);
  BX24.scrollParentWindowAsync('42').then((args) => {
    console.log(args);
  });
});

BX24.bind(buttons.openPath, 'click', () => {
  // BX24.openPath('/marketplace/');
  BX24.openPath('/marketplace/', (answer) => {
    if (answer.result === 'close') {
      console.log('Слайдер закрыт');
    }

    if (answer.result === 'error') {
      if (answer.errorCode === 'PATH_NOT_AVAILABLE') {
        console.log('Нет возможности открыть указанный путь');
      }

      if (answer.errorCode === 'METHOD_NOT_SUPPORTED_ON_DEVICE') {
        alert('Устройство не поддерживается');
      }
    }
  });
});

BX24.bind(buttons.openPathAsync, 'click', () => {
  BX24.openPathAsync('/marketplace/')
    .then(() => {
      console.log('Слайдер закрыт');
    })
    .catch(console.info);
});

BX24.bind(buttons.isMobile, 'click', () => {
  console.log(BX24.isMobile());
});

BX24.bind(buttons.createBatch, 'click', () => {
  const RestCall = BX24.createBatch();
  RestCall.batch({
    app: ['app.info'],
    user: ['user.current'],
    users: [
      'user.get',
      {
        FILTER: {
          USER_TYPE: 'employee',
        },
      },
    ],
  })
    .then(console.info)
    .catch(console.error);
});
