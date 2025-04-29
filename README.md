# bitrix24-library

[![NPM Version](https://img.shields.io/npm/v/bitrix24-library?style=flat&logo=npm&label=version&color=cb3837)](https://www.npmjs.com/package/bitrix24-library)
[![NPM Downloads](https://img.shields.io/npm/dw/bitrix24-library?style=flat&logo=npm&color=cb3837)](https://www.npmjs.com/package/bitrix24-library)
[![GitHub repo size](https://img.shields.io/github/repo-size/vdistortion/bitrix24-library?style=flat&logo=github)](https://github.com/vdistortion/bitrix24-library)
[![GitHub Repo stars](https://img.shields.io/github/stars/vdistortion/bitrix24-library?style=flat&logo=github)](https://github.com/vdistortion/bitrix24-library)
[![GitHub Created At](https://img.shields.io/github/created-at/vdistortion/bitrix24-library?style=flat&logo=github)](https://github.com/vdistortion/bitrix24-library)

[![bitrix24-library](docs/bg.jpg)](https://vdistortion.github.io/bitrix24-library/)

Promise-обёртка для работы с JavaScript REST API Bitrix24 и набор новых методов

## Установка и подключение

```sh
npm i -S bitrix24-library@latest
```

```js
import { Bitrix24 } from 'bitrix24-library';

Bitrix24().then((BX24) => {
  console.log(BX24.getAuth());

  const RestCall = BX24.createBatch();
  RestCall.batch({
    info: ['app.info'],
    profile: ['profile'],
  }).then(console.info);
});
```

## Подключение и вызов методов на примере Vue.js

```js
// main.js
import { createApp } from 'vue';
import { Bitrix24, type IBX24 } from 'bitrix24-library';
import App from './App.vue';

Bitrix24().then((BX24: IBX24) => {
  createApp(App).provide('$BX24', BX24).mount('#app');
});
```

```html
<script setup lang="ts">
  // Composition API
  import { inject } from 'vue';

  const BX24 = inject('$BX24')!;

  console.info(BX24.getAuth());

  const RestCall = BX24.createBatch();
  RestCall.batch({
    info: ['app.info'],
    profile: ['profile'],
  }).then(console.info);
</script>

<script lang="ts">
  // Options API
  export default {
    mounted() {
      console.info(this.$BX24.getAuth());

      const RestCall = this.$BX24.createBatch();
      RestCall.batch({
        info: ['app.info'],
        profile: ['profile'],
      }).then(console.info);
    },
    inject: ['$BX24'],
  };
</script>
```

## Битрикс24

- [Методы BX24](BITRIX24.md)

### Асинхронные методы

- `.initAsync()` — Добавляет в список обработчик события "библиотека готова к работе"

- `.installAsync()` — Возможность установить обработчик события "приложение запускается первый раз для текущего пользователя"

- `.refreshAuthAsync()` — Принудительное обновление ключа авторизации

- `.callBatchAsync(calls[, bHaltOnError])` — Пакетное выполнение запросов по несколько элементов (в настоящий момент не более, чем по 50)

- `.selectUsersAsync([multiple])` — Показать стандартный диалог выбора пользователей

- `.selectAccessAsync([disablesValues])` — Показать стандартный диалог выбора прав доступа

- `.selectCRMAsync([config])` — Показать стандартный диалог выбора сущности CRM

- `.resizeWindowAsync(width, height)` — Изменяет размер фрейма с приложением

- `.fitWindowAsync()` — Устанавливает размер фрейма с приложением в соответствии с размерами содержимого фрейма

- `.setTitleAsync(title)` — Устанавливает заголовок страницы

- `.readyAsync()` — Устанавливает обработчик события "DOM-структура документа готова к работе"

- `.loadScriptAsync(src)` — Загружает и выполняет клиентский js-файл

- `.openApplicationAsync([params])` — Метод открывает приложение

- `.scrollParentWindowAsync(scroll)` — Метод прокручивает родительское окно

- `.openPathAsync(path)` — Метод открывает указанный путь внутри портала в слайдере

### Новые методы

- `.createBatch([handlerList[, BatchClass]])` — Создание пакетного выполнения запросов, надстройка над `.callBatch()` ([подробнее](BATCH.md))

- `.isMobile()` — [is-mobile](https://www.npmjs.com/package/is-mobile)

## Ссылки

- [vue-bitrix24](https://www.npmjs.com/package/vue-bitrix24)
- [react-bitrix24](https://www.npmjs.com/package/react-bitrix24)
- [bitrix24-create-app](https://www.npmjs.com/package/bitrix24-create-app)
- [bitrix24-stickerpack-app](https://github.com/vdistortion/bitrix24-stickerpack-app)

<details>
  <summary>:imp:</summary>
  Если вам не повезло работать с битриксом, надеюсь данная библиотека хоть немного облегчит разработку ¯\_(ツ)_/¯
</details>
