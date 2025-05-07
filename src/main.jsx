import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter basename="/silly-smile-wallpaper-images"> */}
    <Router>
      <App />
    </Router>
    {/* </BrowserRouter> */}
  </StrictMode>,
)
