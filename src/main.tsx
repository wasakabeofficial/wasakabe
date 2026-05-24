import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initScrollSmoother } from './lib/scrollSmoother'
import App from './App.tsx'

initScrollSmoother()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
