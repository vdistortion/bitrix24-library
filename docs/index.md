---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'bitrix24-library'
  text: 'JavaScript REST API Bitrix24'
  tagline: Promise-wrapper and a set of new methods
  actions:
    - theme: brand
      text: Documentation
      link: /docs
    - theme: alt
      text: BX24.createBatch()
      link: /rest-call

features:
  - title: Using Bitrix JavaScript Library
    details: Including the Library in Your Script
    link: https://training.bitrix24.com/rest_help/js_library/index.php
  - title: BX24.JS SDK
    details: New REST documentation
    link: https://apidocs.bitrix24.ru/api-reference/bx24-js-sdk/index.html
---

## Install

```sh
npm i bitrix24-library@latest
```

## Use

```js
import Bitrix24 from 'bitrix24-library';

Bitrix24.init().then((BX24) => {
  console.log(BX24.getAuth());

  const RestCall = BX24.createBatch();
  RestCall.batch({
    info: ['app.info'],
    profile: ['profile'],
  }).then(console.info);
});
```
