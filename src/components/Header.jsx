import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="filter-box">
          <ul className="menu">
            <li><Link to="/">Αρχική</Link></li>
            <li><ScrollLink to="sxetika" smooth={true} duration={500}>Σχετικά</ScrollLink></li>
            <li><ScrollLink to="MapComponent" smooth={true} duration={500}>Χάρτης</ScrollLink></li>
            <li><ScrollLink to="data-container" smooth={true} duration={500}>Σημεία Ανακύκλωσης</ScrollLink></li>
            <li><ScrollLink to="epikoinwnia" smooth={true} duration={500}>Επικοινωνία</ScrollLink></li>
            <li><Link to="/add">Προσθήκη κάδου</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
