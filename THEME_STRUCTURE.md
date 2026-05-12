# Theme Structure Documentation

## Updated Theme JSON Format

Каждая тема теперь должна содержать следующие поля:

### Обязательные поля:

```json
{
  "name": "Название темы",
  "description": "Описание на английском языке",
  "author": "Имя автора",
  "device": ["Core", "StickC"],
  "category": "Theme",
  "download_url": "https://example.com/download"
}
```

### Опциональные поля:

```json
{
  "description_ru": "Описание на русском языке",
  "version": "v1.0",
  "screenshot": "https://example.com/screenshot.png",
  "date": "2024-10-08",
  "tags": ["retro", "amber", "classic"]
}
```

## Поле `device` (Устройства)

**Тип:** `string` или `array`

Теперь поддерживает несколько устройств одновременно:

```json
// Одно устройство (старый формат, всё ещё поддерживается)
"device": "Core"

// Несколько устройств (новый формат)
"device": ["Core", "StickC", "Cardputer"]
```

**Доступные значения:**
- `StickC` - M5StickC
- `Cardputer` - Cardputer
- `T-Embed` - T-Embed
- `CYD` - CYD
- `Core` - M5Core
- `T-Deck` - T-Deck
- `T-LoRa-Pager` - T-LoRa-Pager
- `Smoochiee` - Smoochiee
- `RF-Reaper` - RF Reaper

## Поле `category` (Категория)

**Тип:** `string`

Определяет тип ресурса. Обязательное поле для фильтрации.

**Доступные значения:**
- `Theme` - Визуальная тема оформления
- `Scheme` - Цветовая схема
- `Files` - SD-файлы и ресурсы
- `Script` - Скрипты и приложения

## Примеры

### Пример 1: Тема для нескольких устройств

```json
{
  "name": "Cyberpunk Theme",
  "description": "A futuristic cyberpunk-inspired theme with neon colors",
  "description_ru": "Футуристическая киберпанк-тема с неоновыми цветами",
  "author": "designer_name",
  "version": "v2.1",
  "device": ["Core", "StickC", "Cardputer"],
  "category": "Theme",
  "screenshot": "https://example.com/cyberpunk.png",
  "download_url": "https://github.com/user/repo/releases/download/v2.1/cyberpunk.zip",
  "date": "2024-10-15",
  "tags": ["cyberpunk", "neon", "dark", "modern"]
}
```

### Пример 2: Скрипт для одного устройства

```json
{
  "name": "Snake Game",
  "description": "Classic snake game implementation",
  "description_ru": "Классическая игра змейка",
  "author": "game_dev",
  "version": "v1.0",
  "device": ["StickC"],
  "category": "Script",
  "screenshot": "https://example.com/snake.png",
  "download_url": "https://github.com/user/repo/releases/download/v1.0/snake.js",
  "date": "2024-09-20",
  "tags": ["game", "retro", "fun"]
}
```

### Пример 3: SD-файлы для всех устройств

```json
{
  "name": "Complete SD Card Pack",
  "description": "Full SD card setup with all necessary files",
  "description_ru": "Полный набор файлов для SD карты",
  "author": "community",
  "version": "v3.0",
  "device": ["Core", "StickC", "Cardputer", "T-Embed", "CYD", "T-Deck", "T-LoRa-Pager", "Smoochiee", "RF-Reaper"],
  "category": "Files",
  "screenshot": "https://example.com/sdcard.png",
  "download_url": "https://github.com/user/repo/releases/download/v3.0/sd-pack.zip",
  "date": "2024-10-01",
  "tags": ["complete", "setup", "essential"]
}
```

## Обратная совместимость

Сайт полностью поддерживает старый формат с одним устройством:

```json
{
  "name": "Old Theme",
  "device": "Core",
  "category": "Theme"
}
```

Это будет автоматически преобразовано в массив при обработке.

## Фильтрация на сайте

На сайте доступны два типа фильтров:

1. **Фильтр по устройствам** - выбирает темы, совместимые с выбранным устройством
2. **Фильтр по категориям** - выбирает темы определённого типа (Theme, Scheme, Files, Script)

Оба фильтра работают независимо и могут комбинироваться.
