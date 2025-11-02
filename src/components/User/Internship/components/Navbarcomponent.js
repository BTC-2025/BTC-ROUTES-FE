import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../../../assests/logo2.png'

const terminalGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #00FFC6; }
  50% { text-shadow: 0 0 20px #4F46E5; }
`;

const Navbar = styled.nav`
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 80px;
  border-bottom: 1px solid rgba(0, 255, 198, 0.3);
  font-family: 'Fira Code', monospace;
  // background: rgba(17, 24, 39, 0.85);

  .navbar-brand {
    font-weight: 700;
    font-size: 1.5rem;
    color: #E5E7EB !important;
    text-shadow: 0 0 10px #00FFC6;
    animation: ${terminalGlow} 3s ease-in-out infinite;
  }

  .nav-link {
    color: #E5E7EB !important;
    font-weight: 500;
    margin: 0 0.5rem;
    transition: all 0.3s ease;
    position: relative;
    font-family: 'Fira Code', monospace;

    &:hover {
      color: #FFD700 !important;
      text-shadow: 0 0 10px #FFD700;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00FFC6, #4F46E5);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  .navbar-toggler {
    border: none;
    background: transparent;

    &:focus {
      box-shadow: none;
    }

    .navbar-toggler-icon {
      filter: invert(1);
    }
  }
`;

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img src={logo} alt="web development" width={120} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
            <li className="nav-item"><a className="nav-link" href="#about" onClick={closeMenu}>About</a></li>
            <li className="nav-item"><a className="nav-link" href="#skills" onClick={closeMenu}>Skills</a></li>
            <li className="nav-item"><a className="nav-link" href="#curriculum" onClick={closeMenu}>Curriculum</a></li>
            <li className="nav-item"><a className="nav-link" href="#projects" onClick={closeMenu}>Projects</a></li>
            <li className="nav-item"><a className="nav-link" href="#apply" onClick={closeMenu}>Apply</a></li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
