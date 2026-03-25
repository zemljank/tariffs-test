# Tariffs Test

[![CI](https://github.com/zemljank/tariffs-test/actions/workflows/ci.yml/badge.svg)](https://github.com/zemljank/tariffs-test/actions/workflows/ci.yml)

Live demo: [tariffs-test-eight.vercel.app](https://tariffs-test-eight.vercel.app)

Тестовое задание (React + Next + Tailwind) с реализацией экрана тарифов по макету Figma.

## Что реализовано

- загрузка тарифов с API `https://t-core.fit-hub.pro/Test/GetTariffs`;
- выбор тарифа с визуальным выделением;
- мигающая кнопка `Купить`;
- закреплённый хедер с таймером на 2 минуты;
- при остатке `<= 30с` таймер мигает и становится красным;
- валидация чекбокса согласия при клике на `Купить`;
- после завершения таймера скидочные цены скрываются, остаются `full_price`;
- процент скидки считается автоматически.

## Анимация при окончании скидки

Использован вариант `priceSwap` (краткий fade/slide для смены цены), чтобы смена с discount на full-price была заметной, но без резкого скачка интерфейса.

## Технологии

- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3

## Запуск проекта

```bash
npm install
npm run dev
```

Открыть: `http://localhost:3000`

## Проверка перед отправкой

```bash
npm run check
```

Команда выполняет:

1. сборку `styles.scss -> styles.css`;
2. lint;
3. typecheck;
4. production build.

## Тесты

```bash
npm run test:run
```

Покрыты ключевые сценарии:

- форматирование цен и расчет скидки (`src/lib/utils`);
- обработка ошибок и фильтрация данных API (`src/lib/api`);
- поведение таймера и вызов `onExpire` (`HeaderTimer`);
- UX-сценарии покупки: валидация чекбокса и завершение акции (`TariffsList`).

## Структура SCSS

SCSS разложен по папкам:

- `scss/base`
- `scss/layout`
- `scss/components`
- `scss/responsive`
- `scss/utilities`

Точка входа: `styles.scss`
Скрипт сборки: `scripts/build-scss.mjs`
