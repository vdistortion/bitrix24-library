import { loadScript } from './utils/loadScript';
import { createBitrix24Extended } from './Bitrix24Extended.ts';
import { createBitrix24Async } from './Bitrix24Async.ts';
import type { IBX24, IBX24Vanilla } from '../types';

export async function Bitrix24(): Promise<IBX24> {
  await loadScript('https://api.bitrix24.com/api/v1/');
  const BX24Vanilla: IBX24Vanilla = { ...window.BX24 };
  const BX24Async = createBitrix24Async(BX24Vanilla);
  const BX24Extended = createBitrix24Extended(BX24Vanilla);

  return {
    ...BX24Vanilla,
    ...BX24Async,
    ...BX24Extended,
  };
}
