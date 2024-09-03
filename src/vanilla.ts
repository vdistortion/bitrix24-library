import { btnBind, btnUnbind, callback } from './dom';
import { initVanilla } from './methods/init';
import { installVanilla } from './methods/install';
import type { IBitrix24 } from '../types';

export default function (BX24: IBitrix24) {
  initVanilla(BX24);
  installVanilla(BX24); // !
  console.log(BX24.installFinish());
  console.log(BX24.getAuth());
  BX24.refreshAuth((args: any) => console.info(args));
  BX24.callMethod('user.get', {}, (args: any) => console.info(args.data()));
  BX24.callBatch(
    {
      user: ['user.get'],
    },
    (args: any) => console.info(args),
  );
  BX24.bind(btnBind, 'click', callback);
  BX24.bind(btnUnbind, 'click', (e: Event) => {
    console.log(e.target);
    BX24.unbind(btnBind, 'click', callback);
  });
  BX24.appOption.set('appOption_1', 'app1', (options: any) => {
    console.log('BX24.appOption.set', options);
  });
  BX24.appOption.set('appOption_2', 'app2', (options: any) => {
    console.log('BX24.appOption.set', options);
  });
  console.log('appOption.get', BX24.appOption.get('appOption_1'));
  console.log('appOption.get', BX24.appOption.get('appOption_1'));
  BX24.userOption.set('userOption_1', 'user1');
  BX24.userOption.set('userOption_2', [5]);
  console.log('userOption.get', BX24.userOption.get('userOption_1'));
  console.log('userOption.get', BX24.userOption.get('userOption_2'));
  BX24.bind(btnBind, 'click', () => {
    BX24.selectUser((user: any) => console.log(user));
    BX24.selectUsers((users: any) => console.log(users));
    BX24.selectAccess([], (access: any) => console.log(access));
    BX24.selectCRM((crm: any) => console.log(crm));
    BX24.selectCRM({ entityType: [], multiple: true }, (crm: any) => console.log(crm));
  });
  console.log(BX24.isAdmin());
  console.log(BX24.getLang());
  BX24.resizeWindow(20, 20, console.log);
  BX24.fitWindow(console.log);
  console.log(BX24.reloadWindow());
  BX24.setTitle('Not Promise', console.log);
  BX24.ready(() => {
    console.log('BX24.ready');
  });
  console.log(BX24.isReady());
  BX24.bind(btnBind, 'click', () => {
    BX24.openApplication({}, console.log);
  });
  BX24.bind(btnUnbind, 'click', () => {
    BX24.closeApplication();
  });
  BX24.scrollParentWindow(1000, console.log);
  BX24.proxy((data: any) => {
    console.log(data);
    console.log(BX24.proxyContext());
  }, BX24);
  console.log(BX24.getScrollSize());
  BX24.bind(btnBind, 'click', () => {
    BX24.im.callTo('1');
    BX24.im.phoneTo('89501234567');
    BX24.im.openMessenger();
    BX24.im.openHistory('1');
  });
  BX24.callBind('OnAppUninstall', 'console.log', 2, console.log);
}
