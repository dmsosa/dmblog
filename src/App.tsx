import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {


  return (

    <React.Fragment>
      <header className="header">
        <Navbar/>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer/>
      </footer>
    </React.Fragment>

    
  )
}

export default App;
