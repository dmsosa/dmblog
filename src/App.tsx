import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';
import Container from './components/Container'
import ViteLogo from './components/Logos/ViteLogo'
import Navbar from './components/Navbar/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <header className="header">
        <Navbar/>
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
