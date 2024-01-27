import { loadScript } from './utils/loadScript';
import { Bitrix24 } from './Bitrix24';

export default {
  async init() {
    await loadScript('https://api.bitrix24.com/api/v1/');
    if (window.BX24) {
      const BX24 = new Bitrix24(window.BX24);
      return BX24.init().then(() => BX24);
    }
    return null;
  },
};
