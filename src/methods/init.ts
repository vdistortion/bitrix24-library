import type { IBitrix24, IBitrix24Library } from '../../types';

export function init(BX24: IBitrix24Library) {
  BX24.init().then((args: any) => console.info(args));
}

export function initVanilla(BX24: IBitrix24) {
  BX24.init((args: any) => console.info(args));
}
