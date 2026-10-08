import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import App from './App' 

const rootElement = document.getElementById('root')!; 

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)