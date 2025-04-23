const methods = [
  'init',
  'getAuth',
  'refreshAuth',
  'callMethod',
  'callBatch',
  'callBind',
  'callUnbind',
  'userOption.set',
  'userOption.get',
  'appOption.set',
  'appOption.get',
  'selectUser',
  'selectUsers',
  'selectAccess',
  'selectCRM',
  'placement.bind',
  'placement.unbind',
  'placement.bindEvent',
  'placement.call',
  'placement.getInterface',
  'placement.info',
  'isAdmin',
  'getLang',
  'resizeWindow',
  'fitWindow',
  'reloadWindow',
  'setTitle',
  'ready',
  'isReady',
  'proxy',
  'proxyContext',
  'bind',
  'unbind',
  'getDomain',
  'getScrollSize',
  'loadScript',
  'im.callTo',
  'im.phoneTo',
  'im.openMessenger',
  'im.openHistory',
  'openApplication',
  'closeApplication',
  'scrollParentWindow',
  'openPath',
];
const app = document.querySelector('#app')!;
const fragment = new DocumentFragment();
const buttons: Record<string, HTMLButtonElement> = {};

methods.forEach((method) => {
  const button = document.createElement('button');
  button.innerText = `.${method}`;
  fragment.append(button);
  buttons[method] = button;
});

app.append(fragment);

export { buttons };
export const callback = (e: Event) => {
  console.info(e);
};
