import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './router'
import './styles.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
  </QueryClientProvider>

)