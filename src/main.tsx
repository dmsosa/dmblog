import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './scss/styles.scss'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/Home.tsx'
import AuthProvider from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />}>
              </Route>
            </Route>
          </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
)
