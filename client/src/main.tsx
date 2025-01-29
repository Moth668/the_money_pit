import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import PersonalProfile from './components/Profile.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersonalProfile />
  </StrictMode>,
)
