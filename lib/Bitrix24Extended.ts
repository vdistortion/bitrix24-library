import { isMobile } from 'is-mobile';
import { Bitrix24Batch } from './Bitrix24Batch';
import type { IBitrix24, IBitrix24Extended } from '../types';

export function createBitrix24Extended(BX24: IBitrix24): IBitrix24Extended {
  return {
    isMobile,

    createBatch(handlerList) {
      return new Bitrix24Batch(BX24.callBatch, handlerList);
    },
  };
}
