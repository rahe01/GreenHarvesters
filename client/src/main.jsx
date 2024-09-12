import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import { router } from './routes/Routes'
import { Toaster } from 'react-hot-toast'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { HelmetProvider } from 'react-helmet-async'

import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider>
   <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
   </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
)
