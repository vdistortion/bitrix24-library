import { loadScript } from './utils/loadScript';
import { Bitrix24Library } from './Bitrix24';
import { IBitrix24Library, IBitrix24Plugin } from '../types';

const Bitrix24Plugin: IBitrix24Plugin = {
  async init(): Promise<IBitrix24Library> {
    await loadScript('https://api.bitrix24.com/api/v1/');
    const BX24: IBitrix24Library = new Bitrix24Library(window.BX24);
    return BX24.init().then(() => BX24);
  },
};

export default Bitrix24Plugin;
