import { loadScript } from './utils/loadScript';
import { createBitrix24Async } from './Bitrix24Async';
import { createBitrix24Extended } from './Bitrix24Extended';
import type { IBX24, IBX24Vanilla } from '../types';

export async function Bitrix24(): Promise<IBX24> {
  await loadScript('https://api.bitrix24.com/api/v1/');
  const BX24Vanilla: IBX24Vanilla = {
    ...window.BX24,
    appOption: {
      set(name, value, cb) {
        window.BX24.appOption.set(name, value, cb);
      },
      get(name) {
        window.BX24.appOption.get(name);
      },
    },
    userOption: {
      set(name, value) {
        window.BX24.appOption.set(name, value);
      },
      get(name) {
        window.BX24.appOption.get(name);
      },
    },
  };
  const BX24Async = createBitrix24Async(BX24Vanilla);
  const BX24Extended = createBitrix24Extended(BX24Vanilla);

  return {
    ...BX24Vanilla,
    ...BX24Async,
    ...BX24Extended,
  };
}
