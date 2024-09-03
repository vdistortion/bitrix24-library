import { btnBind, btnUnbind, callback } from './dom';
import { init } from './methods/init';
import { install } from './methods/install';
import type { IBitrix24Library } from '../types';

export default function (BX24: IBitrix24Library) {
  init(BX24);
  install(BX24); // !
  console.log(BX24.installFinish());
  console.log(BX24.getAuth());
  BX24.refreshAuth().then((args) => console.info(args));
  BX24.callMethod('user.get', {}, (args: any) => console.info(args.data()));
  BX24.callBatch({
    user: ['user.get'],
  }).then((args: any) => console.info(args));
  console.log(BX24.placement.info());
  console.log(BX24.isMobile());
  const unbindCallback = BX24.bind(btnBind, 'click', callback);
  BX24.bind(btnUnbind, 'click', (e: Event) => {
    console.log(e.target);
    unbindCallback();
  });
  BX24.appOption.set('appOption_1', 'app1').then((options) => {
    console.log('BX24.appOption.set', options);
  });
  BX24.appOption.set('appOption_2', 'app2').then((options) => {
    console.log('BX24.appOption.set', options);
  });
  console.log('appOption.get', BX24.appOption.get('appOption_1'));
  console.log('appOption.get', BX24.appOption.get('appOption_1'));
  BX24.userOption.set('userOption_1', 'user1');
  BX24.userOption.set('userOption_2', 'user2');
  console.log('userOption.get', BX24.userOption.get('userOption_1'));
  console.log('userOption.get', BX24.userOption.get('userOption_2'));
  BX24.bind(btnBind, 'click', () => {
    BX24.openApplication().then(console.log);
    BX24.selectUser().then((user: any) => console.log(user));
    BX24.selectUsers().then((users: any) => console.log(users));
    BX24.selectAccess([]).then((access: any) => console.log(access));
    BX24.selectCRM().then((crm: any) => console.log(crm['contact'])); // ?
    BX24.selectCRM({ entityType: [], multiple: true }).then((crm: any) => console.log(crm));
  });
  console.log(BX24.isAdmin());
  console.log(BX24.getLang());
  BX24.resizeWindow(20, 20).then(console.log);
  BX24.fitWindow().then(console.log);
  console.log(BX24.reloadWindow());
  BX24.setTitle('Promise').then(console.log);
  BX24.ready().then(() => console.log('BX24.readyP'));
  console.log(BX24.isReady());
  BX24.bind(btnBind, 'click', () => {
    BX24.openApplication({}).then(console.log);
  });
  BX24.bind(btnUnbind, 'click', () => {
    BX24.closeApplication();
  });
  BX24.scrollParentWindow(1000).then(console.log);
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
