# Tech Stack — Vibe Coding Now

## Выбранный стек

```
Next.js 14 (App Router)
+ TypeScript
+ Tailwind CSS v3
+ Framer Motion
+ shadcn/ui (выборочно)
+ next-themes
```

---

## Обоснование каждого выбора

### Next.js 14 (App Router)
**Почему:** Оптимальный баланс между скоростью разработки и production-качеством.
- Server Components → быстрая загрузка
- App Router → чистая структура файлов
- Встроенная оптимизация шрифтов и изображений
- Лёгкий деплой на Vercel одной командой

**Альтернативы и почему не они:**
- Vite + React: нет SSR из коробки, больше настройки
- Remix: избыточен для showcase без бэкенда
- Astro: хуже поддержка Framer Motion (client-only animations)

---

### TypeScript
**Почему:** Автодополнение в Cursor работает в 10x лучше. Для showcase-проекта — идеальный баланс: чуть больше кода, но Cursor генерирует более точные компоненты.

---

### Tailwind CSS v3
**Почему:** 
- Скорость вёрстки — не переключаешься между файлами
- Отличная совместимость с Framer Motion
- Встроенные утилиты для темной темы (`dark:`)
- Cursor отлично понимает Tailwind-классы и генерирует корректный код

**Кастомизация:** Расширяем `tailwind.config.ts` своими цветами, анимациями и тенями.

---

### Framer Motion
**Почему:** Лучшая библиотека анимаций для React в 2025-2026.
- `whileInView` — анимации при скролле без IntersectionObserver вручную
- `staggerChildren` — карточки появляются по очереди одной строкой
- `useMotionValue` / `useTransform` — параллакс-эффекты
- `AnimatePresence` — плавное появление/исчезновение элементов
- Декларативный API — Cursor генерирует анимации точно и предсказуемо

**Версия:** `framer-motion@11`

---

### next-themes
**Почему:** Самое простое переключение тёмной/светлой темы без мерцания (flash).
- 0 конфигурации
- Синхронизация с системными настройками
- Работает из коробки с Tailwind `dark:`

---

### shadcn/ui (выборочно)
**Почему:** Берём только нужные компоненты (Switch, Slider, Tabs) — они копируются в проект и полностью кастомизируются. Никакой лишней зависимости.

**Используем:** `Switch`, `Slider`, `Tabs`, `Badge`

---

## Полный список зависимостей

### dependencies
```json
{
  "next": "14.2.x",
  "react": "^18.3.x",
  "react-dom": "^18.3.x",
  "framer-motion": "^11.x",
  "next-themes": "^0.3.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x",
  "canvas-confetti": "^1.9.x",
  "@radix-ui/react-switch": "^1.x",
  "@radix-ui/react-slider": "^1.x",
  "@radix-ui/react-tabs": "^1.x"
}
```

### devDependencies
```json
{
  "typescript": "^5.x",
  "@types/node": "^20.x",
  "@types/react": "^18.x",
  "@types/canvas-confetti": "^1.x",
  "tailwindcss": "^3.4.x",
  "autoprefixer": "^10.x",
  "postcss": "^8.x",
  "eslint": "^8.x",
  "eslint-config-next": "14.x"
}
```

---

## Шрифты (Google Fonts через next/font)

```ts
// Заголовки — брутальный, современный
display: "Space Grotesk" // → НЕТ, избито
display: "Syne"          // ✅ Геометричный, авангардный

// Тело — читаемый, нейтральный  
body: "DM Sans"          // ✅ Современный, не Inter
```

---

## Деплой

**Vercel** — нулевая конфигурация для Next.js проектов.

```bash
# Одна команда
vercel --prod
```

---

## Команды разработки

```bash
# Установка
npm install

# Разработка
npm run dev          # → http://localhost:3000

# Сборка
npm run build
npm run start

# Линтинг
npm run lint
```
