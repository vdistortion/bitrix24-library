import Bitrix24Library, { type IBitrix24, type IBitrix24Library } from '..';
// import promise from './promise';
// import vanilla from './vanilla';

Bitrix24Library.init()
  .then((BX24: IBitrix24Library) => {
    console.log(BX24);
    // promise(BX24);
    return BX24.BX24;
  })
  .then((BX24: IBitrix24) => {
    console.log(BX24);
    // vanilla(BX24);
  });
