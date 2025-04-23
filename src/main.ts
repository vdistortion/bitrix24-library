import { Bitrix24 } from '../lib';
import { loadScript } from '../lib/utils/loadScript';
import type { IBX24Vanilla, AjaxResultType } from '../types';
import { buttons, callback } from './dom.ts';
import './styles.css';

await loadScript('https://api.bitrix24.com/api/v1/');
const BX24: IBX24Vanilla = window.BX24;
console.log(BX24);

Bitrix24().then((BX24) => {
  console.log(window.BX24, BX24);
});

const id = 2;
const link = `/marketplace/view/${id}/`;
const placement = 'REST_APP_URI';
const handler = [window.location.origin, 'index.html'].join('/');
console.log(link);

// BX24.install('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');

// BX24.install(() => {
//   console.log('install');
//   BX24.installFinish();
// });

BX24.bind(buttons.init, 'click', () => {
  BX24.init(() => {
    console.log('init');
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

BX24.bind(buttons.callMethod, 'click', () => {
  BX24.callMethod('user.get', {}, (args: any) => console.info(args));
});

BX24.bind(buttons.callBatch, 'click', () => {
  BX24.callBatch(
    {
      user: ['user.get'],
    },
    (args: any) => console.info(args),
  );
  BX24.callBatch([['user.get']], (args: any) => console.info(args));
});

BX24.bind(buttons.callBind, 'click', () => {
  BX24.callBind('OnAppUninstall', 'console.log', 2, console.log);
});

BX24.bind(buttons.callUnbind, 'click', () => {
  BX24.callUnbind('OnAppUninstall', 'console.log', 2, console.log);
});

BX24.bind(buttons['userOption.set'], 'click', () => {
  BX24.userOption.set('userOption_1', 'user1');
  BX24.userOption.set('userOption_2', [5]);
});

BX24.bind(buttons['userOption.get'], 'click', () => {
  console.log('userOption.get', BX24.userOption.get('userOption_1'));
  console.log('userOption.get', BX24.userOption.get('userOption_2'));
});

BX24.bind(buttons['appOption.set'], 'click', () => {
  BX24.appOption.set('appOption_1', 'app#1', (options: any) => {
    console.log('BX24.appOption.set', options);
  });
  BX24.appOption.set('appOption_2', 'app$2', (options: any) => {
    console.log('BX24.appOption.set', options);
  });
});

BX24.bind(buttons['appOption.get'], 'click', () => {
  console.log('appOption.get', BX24.appOption.get('appOption_1'));
  console.log('appOption.get', BX24.appOption.get('appOption_2'));
});

BX24.bind(buttons.selectUser, 'click', () => {
  BX24.selectUser((user: any) => console.log(user));
});

BX24.bind(buttons.selectUsers, 'click', () => {
  BX24.selectUsers((users: any) => console.log(users));
});

BX24.bind(buttons.selectAccess, 'click', () => {
  BX24.selectAccess([], (access: any) => console.log(access));
});

BX24.bind(buttons.selectCRM, 'click', () => {
  // BX24.selectCRM((crm: any) => console.log(crm));
  BX24.selectCRM({ entityType: [], multiple: true }, (crm: any) => console.log(crm));
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
  BX24.placement.call('showHelper', { title: '' }, (result: any) => {
    console.log(result);
  });
});

BX24.bind(buttons['placement.bindEvent'], 'click', () => {
  BX24.placement.bindEvent('click', (result: any) => {
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
    (result: AjaxResultType<any, any>) => {
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
    (result: AjaxResultType<any, any>) => {
      console.log(result);
    },
  );
});

BX24.bind(buttons.isAdmin, 'click', () => {
  console.log(BX24.isAdmin());
});

BX24.bind(buttons.getLang, 'click', () => {
  const lang = BX24.getLang();
  console.log(lang === 'ru');
});

BX24.bind(buttons.resizeWindow, 'click', () => {
  BX24.resizeWindow('700', 500, (args) => {
    console.log(args);
  });
});

BX24.bind(buttons.fitWindow, 'click', () => {
  BX24.fitWindow((args) => {
    console.log(args);
  });
});

BX24.bind(buttons.reloadWindow, 'click', () => {
  BX24.reloadWindow();
});

BX24.bind(buttons.setTitle, 'click', () => {
  BX24.setTitle('New Title', (args) => {
    console.log(args);
  });
});

BX24.bind(buttons.ready, 'click', () => {
  BX24.ready(() => {
    console.log('DOM-структура документа готова к работе');
  });
});

BX24.bind(buttons.isReady, 'click', () => {
  console.log(BX24.isReady());
});

BX24.bind(buttons.proxy, 'click', function () {
  const a = {
    f(args: string) {
      console.log('proxy', this);
      console.log(BX24.proxyContext());
      return args;
    },
  };

  const func = BX24.proxy(a.f, buttons.proxy);

  const b = func('proxyContext');
  console.log(b);
});

BX24.bind(buttons.proxyContext, 'click', () => {
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
  console.log(BX24.getScrollSize());
});

BX24.bind(buttons.loadScript, 'click', () => {
  // @ts-ignore
  console.log(window._);

  BX24.loadScript(['https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'], () => {
    // @ts-ignore
    console.log(window._);
  });
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
  // BX24.openApplication(() => {
  //   console.log('Application closed!');
  // });
  BX24.openApplication(
    {
      opened: true,
      bx24_label: {
        bgColor: 'violet',
      },
      bx24_leftBoundary: 500,
      bx24_width: 300,
    },
    () => {
      console.log('Application closed!');
    },
  );
});

BX24.bind(buttons.closeApplication, 'click', () => {
  BX24.closeApplication();
});

BX24.bind(buttons.scrollParentWindow, 'click', () => {
  BX24.scrollParentWindow(0, (args: any) => {
    console.log(args);
  });
  BX24.scrollParentWindow('42', (args: any) => {
    console.log(args);
  });
});

BX24.bind(buttons.openPath, 'click', () => {
  BX24.openPath('/marketplace/', (a) => {
    if (a.result === 'close') {
      console.log('Слайдер закрыт');
    }

    if (a.result === 'error') {
      if (a.errorCode === 'PATH_NOT_AVAILABLE') {
        console.log('Нет возможности открыть указанный путь');
      }

      if (a.errorCode === 'METHOD_NOT_SUPPORTED_ON_DEVICE') {
        alert('Мобильное приложение не поддерживается');
      }
    }
  });
});
