export function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    let shouldAppend = false;
    let el: HTMLScriptElement | null = document.querySelector(`script[src^="${src}"]`);

    if (el) {
      resolve(el);
      return;
    } else {
      el = document.createElement('script');
      el.async = true;
      el.src = src;
      shouldAppend = true;
    }

    el.addEventListener('error', reject);
    el.addEventListener('abort', reject);
    el.addEventListener('load', (e) => {
      resolve(e.target);
    });

    if (shouldAppend) document.head.append(el);
  });
}
