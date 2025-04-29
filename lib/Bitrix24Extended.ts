import { isMobile, type IsMobileOptions } from 'is-mobile';
import { Bitrix24Batch } from './Bitrix24Batch';
import type { IBitrix24Batch, IBX24Extended, IBX24Vanilla, IHandlerList } from '../types';

export function createBitrix24Extended(BX24: IBX24Vanilla): IBX24Extended {
  return {
    isMobile(opts?: IsMobileOptions) {
      return isMobile(opts);
    },

    createBatch(handlerList: IHandlerList = {}, BatchClass: any = Bitrix24Batch): IBitrix24Batch {
      return new BatchClass(BX24.callBatch, handlerList);
    },
  };
}
