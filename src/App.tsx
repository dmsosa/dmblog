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
        <ViteLogo/>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Container/>
      </main>
      <footer className="footer">

      </footer>
      
    </React.Fragment>

    
  )
}

export default App
