import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './contexts/ContextAPI.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <BrowserRouter>
    <ContextAPI>
    <App />
    </ContextAPI>
    </BrowserRouter>
    
  </StrictMode>,
)
