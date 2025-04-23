import { isMobile, type IsMobileOptions } from 'is-mobile';
import { Bitrix24Batch } from './Bitrix24Batch';
import type { IBitrix24Batch, IHandlerList, IBX24Extended, IBX24Vanilla } from '../types';

export function createBitrix24Extended(BX24: IBX24Vanilla): IBX24Extended {
  return {
    isMobile(opts?: IsMobileOptions) {
      return isMobile(opts);
    },

    createBatch(handlerList: IHandlerList = {}, BatchClass: any = Bitrix24Batch): IBitrix24Batch {
      return new BatchClass(BX24.callBatch, handlerList);
    },

    openLink(url: string, inNewTab = false) {
      const openLinkInNewTab = (href: string) => {
        const anchor = document.createElement('a');
        anchor.href = ['https://', BX24.getDomain(), href].join('');
        anchor.target = '_blank';
        anchor.click();
      };

      if (inNewTab) {
        openLinkInNewTab(url);
      } else if (isMobile()) {
        openLinkInNewTab(url);
      } else {
        BX24.openPath(url, ({ result }) => {
          if (result === 'error') openLinkInNewTab(url);
        });
      }
    },
  };
}
