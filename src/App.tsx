import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { IconContext } from 'react-icons';
import { DiReact, DiGithubBadge, DiDjango, DiAws } from "react-icons/di";

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
