import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './scss/styles.scss'
import AuthProvider from './context/AuthContext.tsx'
import Home from './routes/Home.tsx'
import  Login  from './routes/Login.tsx'
import SignUp from './routes/SignUp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="login" element={<Login />}/>
              <Route path="sign-up" element={<SignUp />}></Route>
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
