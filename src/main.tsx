import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './presentation/shared.css'
import { I18nProvider } from './presentation/i18n/I18nContext'
import { DependenciesProvider } from './presentation/context/DependenciesContext'
import { initScrollSmoother } from './presentation/utils/scrollSmoother'
import App from './App.tsx'

initScrollSmoother()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <DependenciesProvider>
        <App />
      </DependenciesProvider>
    </I18nProvider>
  </StrictMode>,
)
