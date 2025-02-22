import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Landing from './landing.jsx'
import './landing.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Landing />
    
  </StrictMode>,
)
