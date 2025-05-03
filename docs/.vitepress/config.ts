import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'bitrix24-library',
  description: 'Promise-wrapper for JavaScript REST API Bitrix24 and a set of new methods',
  base: '/bitrix24-library/',
  head: [['link', { rel: 'icon', href: '/bitrix24-library/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs' },
      { text: 'bitrix24-create-app', link: 'https://vdistortion.github.io/bitrix24-create-app/' },
      {
        text: 'ui-bitrix24',
        link: 'https://vdistortion.github.io/ui-bitrix24/',
      },
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'bitrix24-library', link: '/docs' },
          { text: 'BX24', link: '/bx24' },
          { text: '.createBatch()', link: '/rest-call' },
          { text: '.isMobile()', link: 'https://www.npmjs.com/package/is-mobile' },
        ],
      },
      {
        text: 'More packages',
        items: [
          {
            text: 'bitrix24-create-app',
            link: 'https://www.npmjs.com/package/bitrix24-create-app',
          },
          {
            text: 'vue-bitrix24',
            link: 'https://www.npmjs.com/package/vue-bitrix24',
          },
          {
            text: 'react-bitrix24',
            link: 'https://www.npmjs.com/package/react-bitrix24',
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/bitrix24-library',
      },
      { icon: 'github', link: 'https://github.com/vdistortion/bitrix24-library' },
    ],
  },
});
