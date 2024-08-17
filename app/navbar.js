import React from 'react';
import Link from 'next/link';
import './navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" passHref>
          MySite
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link href="/" passHref>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/" passHref>
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/" passHref>
              Services
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/" passHref>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;