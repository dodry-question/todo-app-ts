# todo-app-ts — Todo-приложение с авторизацией

Учебный командный проект: приложение со списком задач, где у каждого пользователя свои задачи
(регистрация/вход → создание, редактирование, отметка «выполнено», удаление).

**Стек:** фронтенд — TypeScript (React + Vite); бэкенд — Kotlin (Ktor + Exposed); база — PostgreSQL; всё в Docker.

---

## Быстрый старт через Docker

Нужен только установленный Docker Desktop.

1. Скопировать шаблон переменных окружения в `.env`:

   ```bash
   cp .env.example .env      # Windows PowerShell: Copy-Item .env.example .env
   ```

2. Открыть `.env` и проверить значения (обязательно задать `JWT_SECRET`):

   ```env
   POSTGRES_USER=todo
   POSTGRES_PASSWORD=todo
   POSTGRES_DB=todo
   POSTGRES_PORT=5432
   BACKEND_PORT=8080
   JWT_SECRET=change-me-to-a-long-random-string
   JWT_EXPIRES_MINUTES=1440
   FRONTEND_PORT=5173
   ```

   - `JWT_SECRET` — секрет подписи токенов: задай длинную случайную строку. Без него бэкенд не стартует.
   - `.env` в git не попадает (он в `.gitignore`).

3. Поднять всё одной командой:

   ```bash
   docker compose up --build
   ```

   Поднимаются ровно три контейнера: `frontend`, `backend`, `db`.

4. Открыть в браузере:

   - фронтенд: http://localhost:5173
   - API (проверка, что бэк жив): http://localhost:8080/api/tasks — без токена вернёт `401`, это нормально.

5. Логи и остановка:

   ```bash
   docker compose logs -f            # все сервисы
   docker compose logs -f backend    # только бэкенд
   docker compose down               # остановить (данные в базе останутся)
   docker compose down -v            # остановить и удалить данные БД
   ```

> Статус: `docker-compose.yml`, `.env.example` и `Dockerfile`-ы ещё заполняются (участник 5).
> Если `docker compose up` падает — проверь фронт и бэк по отдельности (см. ниже).

---

## Запуск без Docker (для разработки)

### Frontend (React + Vite)

```bash
cd frontend
npm install        # один раз: ставит зависимости из package.json
npm run dev        # dev-сервер → http://localhost:5173
```

- `npm run build` — собрать статику в `frontend/dist`.
- `npm run preview` — посмотреть собранную версию.

При локальной разработке запросы к `/api` проксируются на `http://localhost:8080`
(настроено в `frontend/vite.config.ts`), поэтому CORS не мешает.

### Backend (Kotlin + Ktor)

```bash
cd backend
./gradlew run        # Windows: .\gradlew.bat run
```

Бэкенду нужны переменные `JWT_SECRET` (иначе не стартует) и доступная PostgreSQL.
Адрес базы и порт бэкенд читает из переменных окружения.

### PostgreSQL

Проще всего поднять только базу из compose:

```bash
docker compose up -d db
```

---

## Что уже сделано

| Участник | Зона | Статус |
|---|---|---|
| Участник 1 | фронт: каркас, авторизация, запросы к API, роутинг | в работе |
| Участник 2 | бэкенд на Kotlin: сборка, подключение к БД, модуль задач | — |
| Миша (уч. 3) | fullstack: авторизация на бэке, договор `docs/api.md` | ✅ бэкенд авторизации + `docs/api.md` |
| Петя (уч. 4) | фронт: экран задач (компоненты, стили) | ✅ компоненты + `styles.css` |
| Участник 5 | Docker + PostgreSQL, общий запуск, README | в работе |

## Полезные файлы

- [`docs/plan.md`](docs/plan.md) — план проекта и роли участников.
- [`docs/api.md`](docs/api.md) — договор API между фронтом и бэком (форматы запросов, ответов и ошибок).
- [`docs/handoff-misha.md`](docs/handoff-misha.md) — шпаргалка по запуску и проверке авторизации из консоли.
- [`docs/roles-now.md`](docs/roles-now.md) — актуальный статус по участникам.

## Правила работы

1. Каждый работает в своей ветке, в `main` — только через pull request.
2. Файлы из чужой зоны не правим: нужно — пишешь владельцу.
3. `.env`, пароли и токены в репозиторий не попадают.
4. Перед пушем — `git pull`.
