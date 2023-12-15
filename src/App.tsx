import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';
import Container from './components/Container'
import './App.css'
import ViteLogo from './components/Logos/ViteLogo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <header className="header">
        <h1>Das wurde die grosser Duvis Webseite sein</h1>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">

      </footer>
      
    </React.Fragment>

    
  )
}

export default App
