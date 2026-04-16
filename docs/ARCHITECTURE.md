# Architecture — Vibe Coding Now

## Структура файлов и папок

```
vibe-coding-now/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, ThemeProvider, metadata
│   ├── page.tsx                  # Главная страница — собирает все секции
│   └── globals.css               # CSS-переменные, базовые стили, кастомные утилиты
│
├── components/
│   ├── layout/                   # Обёртки и структурные компоненты
│   │   ├── ThemeProvider.tsx     # Провайдер next-themes
│   │   └── SectionWrapper.tsx    # Обёртка для каждой секции (padding, bg, id)
│   │
│   ├── sections/                 # Основные блоки страницы
│   │   ├── HeroSection.tsx       # Первый экран
│   │   ├── AnimationsSection.tsx # Блок анимаций
│   │   ├── InteractivitySection.tsx # Интерактивные элементы
│   │   ├── VisualFXSection.tsx   # Визуальные эффекты
│   │   ├── ResponsiveSection.tsx # Демо адаптивности
│   │   └── FooterSection.tsx     # Подвал
│   │
│   ├── ui/                       # Переиспользуемые UI-примитивы
│   │   ├── GradientText.tsx      # Текст с градиентом
│   │   ├── GlassCard.tsx         # Glassmorphism-карточка
│   │   ├── NeonButton.tsx        # Кнопка с glow-эффектом
│   │   ├── AnimatedCard.tsx      # Карточка с hover + scroll анимацией
│   │   ├── ThemeToggle.tsx       # Переключатель тёмной/светлой темы
│   │   └── NavBar.tsx            # Навигация (фиксированная, blur-фон)
│   │
│   └── animations/               # Framer Motion хелперы
│       ├── FadeInView.tsx        # Обёртка: fade при попадании в viewport
│       ├── StaggerContainer.tsx  # Контейнер для stagger анимаций
│       └── ParallaxLayer.tsx     # Параллакс через useScroll
│
├── lib/
│   ├── utils.ts                  # cn() хелпер (clsx + tailwind-merge)
│   ├── animations.ts             # Переиспользуемые variants для Framer Motion
│   └── colors.ts                 # Цветовая палитра как JS-константы
│
├── hooks/
│   ├── useTheme.ts               # Хук для доступа к теме
│   └── useScrollProgress.ts      # Прогресс скролла для параллакса
│
├── docs/                         # Контекст для Cursor ← ВЫ ЗДЕСЬ
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── TECH_STACK.md
│   └── CURRENT_STATUS.md
│
├── public/
│   └── (статические ассеты если нужны)
│
├── tailwind.config.ts            # Расширенная конфигурация
├── next.config.ts
└── tsconfig.json
```

---

## Компоненты — детальное описание

### `app/page.tsx` — Главная страница
```tsx
// Роль: Оркестратор. Собирает все секции в порядке.
// Никакой логики — только импорт и рендер секций.
// Каждая секция получает id для якорной навигации.

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <AnimationsSection />
      <InteractivitySection />
      <VisualFXSection />
      <ResponsiveSection />
      <FooterSection />
    </main>
  )
}
```

---

### `components/sections/HeroSection.tsx`
**Ответственность:** Первое впечатление. Запоминающийся визуал.

**Содержимое:**
- Анимированный градиентный фон (CSS `@keyframes` + `background-position`)
- Заголовок "Vibe Coding Now" с `GradientText`
- Подзаголовок с `FadeInView` (delay: 0.3s)
- CTA-кнопка "Смотреть демо" с `NeonButton`
- Floating-элементы на фоне (декоративные блобы, анимируются через Framer Motion)
- Стрелка "скролл вниз" с bounce-анимацией

**Анимации:**
- Заголовок: `y: -20 → 0`, `opacity: 0 → 1`, duration: 0.8s
- Подзаголовок: то же, delay: 0.3s
- Кнопка: то же, delay: 0.5s
- Фоновые блобы: бесконечная плавная анимация position

---

### `components/sections/AnimationsSection.tsx`
**Ответственность:** Показать возможности Framer Motion наглядно.

**Содержимое:**
- Заголовок секции
- 6 карточек с разными типами анимаций, каждая подписана:
  - "Fade In" — простое появление
  - "Slide Up" — вылет снизу
  - "Spring" — пружинная физика
  - "Stagger" — последовательное появление
  - "Hover Scale" — масштаб на ховере
  - "Rotation" — вращение при скролле
- `StaggerContainer` оборачивает карточки → они появляются по очереди

**Ключевой код паттерн:**
```tsx
// StaggerContainer автоматически добавляет delay каждому ребёнку
<StaggerContainer>
  {cards.map(card => (
    <AnimatedCard key={card.id} variant={card.variant}>
      {card.content}
    </AnimatedCard>
  ))}
</StaggerContainer>
```

---

### `components/sections/InteractivitySection.tsx`
**Ответственность:** Доказать что сайт "живой".

**Содержимое:**
- **Confetti Button** — клик вызывает canvas-confetti
- **Morphing Button** — при клике меняет форму/текст (idle → loading → success)
- **Color Slider** — перетаскивание меняет цвет акцента в реальном времени
- **Theme Toggle** — переключатель тёмной/светлой темы (с анимацией солнце↔луна)
- **Counter** — число увеличивается/уменьшается с анимацией цифр
- **Ripple Button** — эффект ряби при клике (CSS)

**Стейт:** Локальный (useState внутри секции, не нужен глобальный стейт)

---

### `components/sections/VisualFXSection.tsx`
**Ответственность:** Модный визуал 2025-2026.

**Содержимое:**
- 3 `GlassCard` с glassmorphism-эффектом (backdrop-blur, прозрачность)
- Карточка с glow/neon эффектом (box-shadow анимируется при ховере)
- Градиентные сетки (CSS mesh gradient)
- Карточка с noise-текстурой (SVG filter)
- Hover-карточка: при наведении меняет цвет по оси X (mousemove → CSS vars)
- Демо шрифтовых пар

**CSS переменные для эффектов:**
```css
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glow-color: var(--accent-primary);
```

---

### `components/sections/ResponsiveSection.tsx`
**Ответственность:** Показать адаптивность визуально.

**Содержимое:**
- Переключатель "устройств": Desktop / Tablet / Mobile (3 кнопки)
- Iframe или div-превью, который меняет ширину при переключении
- Анимация изменения размера через Framer Motion `layout`
- Текстовое объяснение подходов (media queries, flexbox/grid, fluid typography)
- Демо-карточки которые сами перестраиваются при реальном ресайзе окна

---

### `components/sections/FooterSection.tsx`
**Ответственность:** Завершить историю и направить к действию.

**Содержимое:**
- Логотип / название проекта
- Короткое описание
- GitHub-иконка + ссылка
- CTA: "Хочешь научиться так же? → Пройди курс"
- Copyright
- Animated gradient border сверху (декоративный divider)

---

### `components/ui/GlassCard.tsx`
```tsx
// Props: children, className?, glowColor?
// Эффект: backdrop-blur-md, полупрозрачный фон, тонкая граница
// Hover: усиливается blur и яркость border
```

### `components/ui/NeonButton.tsx`
```tsx
// Props: children, onClick?, variant ('primary' | 'outline'), size
// Эффект: box-shadow с цветом акцента, пульсация при hover
// Анимация: Framer Motion whileTap scale: 0.95
```

### `components/ui/GradientText.tsx`
```tsx
// Props: children, gradient? (preset | custom)
// Реализация: background-clip: text + linear-gradient
// Пресеты: 'neon', 'fire', 'ocean', 'purple'
```

### `components/animations/FadeInView.tsx`
```tsx
// Props: children, delay?, direction? ('up'|'down'|'left'|'right')
// Логика: motion.div + whileInView + viewport: { once: true }
// Переиспользуется везде для scroll-triggered анимаций
```

### `components/animations/StaggerContainer.tsx`
```tsx
// Props: children, staggerDelay? (default: 0.1)
// Логика: variants с staggerChildren → дети анимируются по очереди
// Использует: AnimationsSection, VisualFXSection
```

---

## Цветовая палитра

### Тёмная тема (основная)
```css
:root[data-theme="dark"] {
  --bg-primary:    #0A0A0F;   /* почти чёрный с синим оттенком */
  --bg-secondary:  #111118;   /* карточки, секции */
  --bg-tertiary:   #1A1A24;   /* hover-состояния */

  --text-primary:  #F0F0FF;   /* основной текст */
  --text-secondary: #8888AA;  /* вторичный текст */
  --text-muted:    #444460;   /* подсказки, disabled */

  --accent-primary:  #00FF87; /* кислотный зелёный */
  --accent-secondary: #7B2FFF; /* электрик-пурпур */
  --accent-tertiary:  #FF6B35; /* огненный оранжевый */
  --accent-glow:     #00FF87;  /* цвет glow-эффектов */

  --border:        rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.15);

  --glass-bg:      rgba(255,255,255,0.04);
  --shadow-neon:   0 0 20px rgba(0,255,135,0.3), 0 0 60px rgba(0,255,135,0.1);
}
```

### Светлая тема
```css
:root[data-theme="light"] {
  --bg-primary:    #F8F8FF;
  --bg-secondary:  #FFFFFF;
  --bg-tertiary:   #EFEFFF;

  --text-primary:  #0A0A1A;
  --text-secondary: #555570;
  --text-muted:    #9999BB;

  --accent-primary:  #00CC6A;  /* тот же зелёный, чуть темнее */
  --accent-secondary: #6B1FEF; /* пурпур темнее */
  --accent-tertiary:  #E85520; /* оранжевый темнее */

  --border:        rgba(0,0,0,0.08);
  --border-strong: rgba(0,0,0,0.15);

  --glass-bg:      rgba(0,0,0,0.03);
  --shadow-neon:   0 0 20px rgba(0,204,106,0.2), 0 0 60px rgba(0,204,106,0.08);
}
```

---

## `lib/animations.ts` — Переиспользуемые variants

```ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

export const staggerContainer = (staggerChildren = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren } }
})

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}
```

---

## Принципы организации кода

1. **Один компонент — одна ответственность.** `HeroSection` не знает про `AnimationsSection`.
2. **Секции независимы.** Можно удалить/добавить секцию в `page.tsx` одной строкой.
3. **CSS-переменные для всего.** Никаких хардкоженных цветов в компонентах.
4. **Анимации в `animations/` или `lib/animations.ts`.** Не инлайн в JSX.
5. **`cn()` для className.** Всегда `cn(baseStyles, conditional, className)`.
6. **`once: true` для scroll-анимаций.** Анимация срабатывает один раз, не повторяется при прокрутке назад.
