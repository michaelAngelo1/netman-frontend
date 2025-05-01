import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RoomComputerProvider } from './context/ComputerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoomComputerProvider>
      <App />
    </RoomComputerProvider>
  </StrictMode>,
)
