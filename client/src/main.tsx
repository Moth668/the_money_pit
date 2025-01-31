import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.tsx'
import MyForm from './userinput/myform'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyForm />
  </StrictMode>,
)
