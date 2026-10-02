// frontend/src/main.tsx — точка входа фронтенда: подключить стили и отрисовать приложение в элемент из index.html.
// Здесь нужно (участник 1): обернуть приложение в провайдер авторизации и роутер и смонтировать его на страницу.
//
// Сейчас — минимальная версия без роутера и авторизации, чтобы проект просто запускался.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Не найден элемент #root в index.html')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
