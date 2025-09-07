import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' 
import { ToastContainer } from 'react-toastify';
import AuthProvider from './context/AuthProvider.jsx';
 
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <ToastContainer position="top-center" autoClose={3000} />
      <AuthProvider>      
        <App />
      </AuthProvider>
  </StrictMode>,
)
