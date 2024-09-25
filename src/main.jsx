import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import Providers from './lib/Providers/Providers.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
    <Toaster position="top-right" richColors />
  </StrictMode>,
)
