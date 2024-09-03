export const btnBind = document.querySelector('.js-button-bind')!;
export const btnUnbind = document.querySelector('.js-button-unbind')!;
export const callback = (e: Event) => {
  console.info(e.target);
};
