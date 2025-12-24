import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { LoginUserProvider } from '@/features/login/contexts/LoginUserContext';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginUserProvider>
  </StrictMode>,
);