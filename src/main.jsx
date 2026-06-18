import react from 'react'
import reactDom from 'react-dom/client'
import App from './App.jsx'
import './index.css'

reactDom.createRoot(document.getElementById('root')).render(
  <react.StrictMode>
    <App />
  </react.StrictMode>,
)
