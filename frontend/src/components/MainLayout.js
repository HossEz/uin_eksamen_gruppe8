import React from 'react';
import Footer from './Footer.js';
import NavBar from './NavBar.js';

const MainLayout = ({ children }) => {
  return (
    <section className="main-layout">
      <header>
        <NavBar/>
      </header>
      <main>
        {children}
      </main>

      <Footer />
    </section>
  );
};

export default MainLayout;
