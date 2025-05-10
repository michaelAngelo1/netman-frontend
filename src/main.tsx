import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RoomComputerProvider } from './context/ComputerContext.tsx'
import { CommandProvider } from './context/CommandContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CommandProvider>
      <RoomComputerProvider>
        <App />
      </RoomComputerProvider>
    </CommandProvider>
  </StrictMode>,
)
