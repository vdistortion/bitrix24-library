import type { IBitrix24, IBitrix24Library } from '../../types';

export function install(BX24: IBitrix24Library) {
  BX24.install().then((args: any) => console.info(args));
}

export function installVanilla(BX24: IBitrix24) {
  BX24.install((args: any) => console.info(args));
}
