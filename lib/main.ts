import { loadScript } from './utils/loadScript';
import { Bitrix24 } from './Bitrix24';

export default {
  async init() {
    await loadScript('https://api.bitrix24.com/api/v1/');
    const BX24: IBitrix24Library = new Bitrix24(window.BX24 as IBitrix24);
    return BX24.init().then(() => BX24);
  },
};
