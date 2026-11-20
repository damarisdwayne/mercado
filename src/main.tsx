import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'jotai'
import { Toaster } from 'sonner'
import './index.css'
import App from './app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
      <Toaster richColors position="top-center" />
    </Provider>
  </StrictMode>,
)
