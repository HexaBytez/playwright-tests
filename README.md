
---

## Предварительные требования
- Node.js
- npm или yarn
- Доступ к проекту

---

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone <URL_репозитория>
   cd <название_папки_проекта>
   ```

2. Установите зависимости:
   ```bash
   npm install
   # или
   yarn install
   ```

---

## Настройка

- Файл конфигурации Playwright находится по пути: `playwright.config.ts`
- В файле `config/urls.ts` задаётся базовый URL для тестов:
  ```ts
  export const BASE_URL = 'https://example.com';
  ```
- В `data/data_for_login.json` хранится логин и пароль для авторизации

---

## Запуск тестов

- Запуск всех тестов:
  ```bash
  $env:ENV="test"; npx playwright test
  ```

- Запуск конкретного теста или тестового файла:
  ```bash
  $env:ENV="test"; npx playwright test tests/example.spec.ts
  ```

- Запуск с отчетом в браузере (HTML-отчет):
  ```bash
  npx playwright show-report
  ```

---

## Особенности

- В конфиге установлены:
  - `timeout` на 60 секунд на тест
  - `retries` — 1 попытка при неудаче
  - Запуск в headless режиме (без UI)
  - Скриншоты и видео записываются только при падении тестов
- В `.gitignore` добавлены игнорируемые файлы:
  ```
  node_modules/
  .env
  playwright-report/
  test-results/
  *.log
  ```

---

## Ошибки и отладка

- Логи можно смотреть в консоли при запуске
- Для детального дебага отключите headless режим в `playwright.config.ts`:
  ```ts
  use: {
    headless: false,
    ...
  }
  ```
- При ошибках обращайтесь к HTML-отчету для детальной информации

---

## Дополнительные команды

| Команда                         | Описание                             |
|--------------------------------|------------------------------------|
| `npx playwright test`           | Запустить все тесты                 |
| `npx playwright test -g "имя"` | Запустить тесты с указанным именем |
| `npx playwright show-report`   | Открыть HTML отчет                  |
| `npm run lint`                  | Проверить код линтером (если настроен) |

---
