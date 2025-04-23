export function loadScript(src: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    let el = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;

    if (el) {
      resolve(el);
      return;
    }

    el = document.createElement('script');
    el.async = true;
    el.src = src;

    el.addEventListener('error', reject);
    el.addEventListener('abort', reject);
    el.addEventListener('load', () => resolve(el!));

    document.head.appendChild(el);
  });
}
