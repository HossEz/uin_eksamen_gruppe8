import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 1069) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav>
      <Link to="/">
        <h1>GameHub</h1>
      </Link>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link className="navElement" to="/">
            Hjem
          </Link>
        </li>
        <li>
          <Link className="navElement" to="/mine-spill">
            Mine Spill
          </Link>
        </li>
        <li>
          <Link className="navElement" to="/mine-favoritter">
            Mine Favoritter
          </Link>
        </li>
        <li>
          <Link className="navElement" to="/spillbutikk">
            Spillbutikk
          </Link>
        </li>
        <li>
            <button className={`btn ${menuOpen ? 'btn4' : ''}`}>Registrer</button>
        </li>
        <li>
            <button className={`btn2 ${menuOpen ? 'btn4' : ''}`}>Logg inn</button>
        </li>
      </ul>
    </nav>
  );
}
