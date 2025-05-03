import { loadScript } from './utils/loadScript';
import { createBitrix24Async } from './Bitrix24Async';
import { createBitrix24Extended } from './Bitrix24Extended';

export async function Bitrix24() {
  await loadScript('https://api.bitrix24.com/api/v1/');
  const BX24Async = createBitrix24Async(window.BX24);
  const BX24Extended = createBitrix24Extended(window.BX24);

  await BX24Async.initAsync();
  return {
    ...window.BX24,
    ...BX24Async,
    ...BX24Extended,
  };
}
