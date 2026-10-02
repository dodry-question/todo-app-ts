# Todo App (TypeScript + Kotlin + PostgreSQL)

Полнофункциональное веб-приложение для управления задачами (Todo List) с разграничением прав доступа пользователей и автономизацией через Docker.

## 🚀 Важные особенности проекта
* **Изолированность данных:** Каждый пользователь имеет доступ исключительно к собственным активам (задачам). Чужие ресурсы закрыты (403 Forbidden).
* **Единый стек развёртывания:** Приложение полностью инкапсулировано в контейнеры и запускается одной командой без необходимости ручной установки зависимостей среды (кроме Docker Engine).

---

## 🛠 Технологический стек

* **Frontend:** TypeScript, React, React Router, Vite, CSS
* **Backend:** Kotlin, Ktor Framework, Exposed ORM, JWT authentication, BCrypt, HikariCP
* **Database:** PostgreSQL 16
* **Infrastructure & Containerization:** Docker, Docker Compose, Nginx (reverse proxy для SPA)

---

## 🏛 Архитектура и сервисная структура

Система состоит из трёх изолированных сервисов, объединяемых виртуальной сетью Docker Compose:

1. `db` — СУБД PostgreSQL 16 с персистентным томом (`postgres_data`) для сохранения данных при перезапуске.
2. `backend` — REST API на Kotlin/Ktor. Выполняет миграцию схемы БД при старте, обработку аутентификации/авторизации и бизнес-логику задач.
3. `frontend` — Клиентское приложение React, собираемое в статику через Vite и раздаваемое сервером Nginx с проксированием запросов к API.

---

## 📋 Предварительные требования

* **Docker Desktop** (с включённым бэкендом WSL 2 на Windows) или **Docker Engine** + **Docker Compose v2+**.
* **Git** для клонирования репозитория.

---

## 🚦 Быстрый запуск

### 1. Клонирование репозитория
```bash
git clone [https://github.com/dodry-question/todo-app-ts.git](https://github.com/dodry-question/todo-app-ts.git)
cd todo-app-ts
