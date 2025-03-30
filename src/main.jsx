import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EventsProvider } from './context/EventsContext'
import { TeamProvider } from './context/TeamContext'
import { NewsProvider } from './context/NewsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventsProvider>
      <TeamProvider>
        <NewsProvider>
          <App />
        </NewsProvider>
      </TeamProvider>
    </EventsProvider>
  </StrictMode>,
)
