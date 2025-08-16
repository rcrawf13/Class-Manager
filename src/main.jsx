import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ThemeProvider } from '@mui/material';
import Theme from './components/Theme.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={Theme}>
      <App />
      </ThemeProvider>
    </LocalizationProvider>
  </StrictMode>,
)
