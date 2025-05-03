const methods = [
  'init',
  'initAsync',
  'getAuth',
  'refreshAuth',
  'refreshAuthAsync',
  'callMethod',
  'callBatch',
  'callBatchAsync',
  'callBind',
  'callUnbind',
  'userOption.set',
  'userOption.get',
  'appOption.set',
  'appOption.get',
  'selectUser',
  'selectUsers',
  'selectUsersAsync',
  'selectAccess',
  'selectAccessAsync',
  'selectCRM',
  'selectCRMAsync',
  'placement.bind',
  'placement.unbind',
  'placement.bindEvent',
  'placement.call',
  'placement.getInterface',
  'placement.info',
  'isAdmin',
  'getLang',
  'resizeWindow',
  'resizeWindowAsync',
  'fitWindow',
  'fitWindowAsync',
  'reloadWindow',
  'setTitle',
  'setTitleAsync',
  'ready',
  'readyAsync',
  'isReady',
  'proxy',
  'bind',
  'unbind',
  'getDomain',
  'getScrollSize',
  'loadScript',
  'loadScriptAsync',
  'im.callTo',
  'im.phoneTo',
  'im.openMessenger',
  'im.openHistory',
  'openApplication',
  'openApplicationAsync',
  'closeApplication',
  'scrollParentWindow',
  'scrollParentWindowAsync',
  'openPath',
  'openPathAsync',
  'isMobile',
  'createBatch',
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
