# Где проект сейчас и кто что делает

Статус на 03.10.2026. `main` = `c47da2d`: каркас фронта (участник 1), мержи `frontend-tasks`
(Петя), `auth-misha` (Миша: авторизация + `build.gradle.kts` + `DatabaseFactory` + swagger)
и обновлённый `README.md`. Сводка ниже сверена чтением кода, а не по памяти.

## Проект в двух словах

Todo-приложение с авторизацией. Регистрация (имя/email/пароль), вход, выход; каждый видит
только свои задачи: создать, изменить, отметить «выполнено», удалить.

- **Фронт:** TypeScript + React + Vite, роутинг `react-router-dom`, стили одним файлом.
- **Бэкенд:** Kotlin, Ktor + Exposed, база PostgreSQL.
- **Запуск:** Docker, одной командой `docker compose up` (фронт + бэк + база).
- Эндпоинты: `POST /api/auth/register|login|logout`, `GET|POST /api/tasks`,
  `PUT|PATCH /api/tasks/:id`, `DELETE /api/tasks/:id`.
- Страницы: `/login`, `/register`, `/` (список задач), окно редактирования.
- Требования задания — `docs/JUTGKb-Zadanie_07_05.pdf`; договор API — `docs/api.md`
  и готовый `docs/swagger.yaml` (открывается в Swagger UI, см. раздел «Что проверено»).

## Кто что делает сейчас

| Кто | Роль | Что уже готово | Что осталось сделать |
|---|---|---|---|
| **Участник 1** | фронт: каркас и авторизация | конфиги Vite+TS (`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`), `main.tsx`, `types.ts` (частично), `App.tsx` — пока заглушка-приветствие | `api.ts` и `auth.tsx` (пустые), роутинг `/login` `/register` `/` в `App.tsx`, страницы `LoginPage.tsx`/`RegisterPage.tsx` (пустые), дописать в `types.ts` типы `AuthResponse`/`MessageResponse`/`ErrorResponse` |
| **Участник 2 (Илларион)** | бэкенд: сборка, база, задачи | ничего — `Application.kt`, `Plugins.kt`, `Tables.kt`, `model/Task.kt`, `TaskRepository.kt`, `TaskService.kt`, `TaskRoutes.kt`, `settings.gradle.kts`, `application.conf`, `logback.xml` пока заготовки | **главный блокер:** объявить `object Tasks` в `Tables.kt` (иначе `DatabaseFactory` не компилируется), затем `Application.kt` + `Plugins.kt` (JSON, CORS, JWT, ошибки) и все 5 эндпоинтов задач |
| **Миша (участник 3)** | fullstack: авторизация + swagger | **всё готово:** `User.kt`, `UserRepository.kt`, `JwtConfig.kt`, `AuthService.kt`, `AuthRoutes.kt`, `build.gradle.kts`, `DatabaseFactory.kt`, `docs/api.md`, `docs/swagger.yaml` + Swagger UI | прогнать сценарии из задания и сделать тестовые данные (2 пользователя × 3 задачи) — когда Илларион поднимет задачи |
| **Участник 4 (Петя)** | фронт: экран задач | готовы компоненты `TaskList.tsx`, `TaskItem.tsx`, `TaskForm.tsx`, `EditTaskModal.tsx` и `styles.css` (тёмная тема) | `pages/TasksPage.tsx` — пока заглушка; собрать экран и подключить к API (ждёт `api.ts`/`auth.tsx` участника 1) |
| **Участник 5 (Рувим)** | Docker + PostgreSQL | `README.md` уже написан полностью (запуск, `.env`, адреса, логи) | `docker-compose.yml`, `.env.example`, `backend/Dockerfile`, `frontend/Dockerfile`, `frontend/nginx.conf` — заготовки; собрать `docker compose up` на чистой машине |

## Правила

1. Каждый работает в своей ветке (`frontend-tasks`, `backend-kotlin`, `auth-misha`, `docker-team`),
   в `main` напрямую не коммитим, слияние — через pull request.
2. Чужие файлы не правим — пишем владельцу.
3. `.env`, пароли, токены в репозиторий не попадают.
4. Один фронт, один бэк, одна база — никаких вторых сервисов.

## Что проверено (03.10.2026)

- Фронт запускается: `cd frontend` → `npm run dev` → http://localhost:5173 (Vite 8, проверено).
- Сборка фронта проходит: `npm run build` → `frontend/dist` (проверено).
- Swagger UI работает: `node docs/swagger-try-it.mjs` → http://127.0.0.1:8092 (проксирует `/api/*` на бэк `:8080`).
- Бэк пока НЕ собирается и НЕ стартует: файлы участника 2 — заготовки, `Tasks` не объявлена.
- Docker ещё не собран: `docker-compose.yml` и Dockerfile-ы — заготовки.
- Ранее (02.10, спайк, до отката) авторизация Миши проходила в Docker: register `201`, дубль email `409`,
  login `200`, неверный пароль `401`, кривой email `400`, короткий пароль `400`, logout `200`/`401`.

## Следующий шаг команды

1. **Илларион (уч. 2)** — поднять бэк: `Tables.kt` (таблица `tasks`), `Application.kt` + `Plugins.kt`, маршруты задач.
2. **Участник 1** — `api.ts`, `auth.tsx`, роутинг и страницы входа/регистрации.
3. **Петя (уч. 4)** — `TasksPage.tsx` и подключение компонентов к API.
4. **Рувим (уч. 5)** — compose, `.env.example`, Dockerfile-ы, nginx → `docker compose up`.
5. Общий чек-лист «всё запускается» — в конце `docs/plan.md`.
