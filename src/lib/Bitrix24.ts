import { isMobile } from 'is-mobile';
import { loadScript } from '../utils/loadScript';
import { BitrixWrapper } from './BitrixWrapper';
import { BitrixBatch } from './BitrixBatch';

export class Bitrix24 extends BitrixWrapper {
  isMobile = isMobile;
  loadScript = loadScript;

  createBatch(handlerList = {}, BatchClass = BitrixBatch) {
    return new BatchClass(this.BX24.callBatch, handlerList);
  }

  openLink(url: string, inNewTab = false) {
    const openLinkInNewTab = (href: string) => {
      const anchor = document.createElement('a');
      anchor.href = [this.getDomain(true), href].join('');
      anchor.target = '_blank';
      anchor.click();
    };

    if (inNewTab) openLinkInNewTab(url);
    else if (isMobile()) openLinkInNewTab(url);
    else this.openPath(url).catch(() => openLinkInNewTab(url));
  }
}
