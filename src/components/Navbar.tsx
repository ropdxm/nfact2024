import { useState, CSSProperties } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showIcon, setShowIcon] = useState<boolean>(true);
    
  return (
<header>
        <div className="logo">Spoty</div>
        

      <input type="checkbox" id="check" onClick={() => setShowIcon(!showIcon)} />
      <label htmlFor="check" className="icons">
        {showIcon ? <i className="bx bx-menu" id="menu-icon"></i>
        : <i className="bx bx-x" id="close-icon"></i>}
      </label>

      <nav className="navbar">
        <Link to="/" className="nav-item" style={{"--i": 0} as CSSProperties}>Home</Link>
        <Link to="/" className="nav-item" style={{"--i": 1} as CSSProperties}>Plan Your Visit</Link>
        <Link to="/login" className="nav-item" style={{"--i": 2} as CSSProperties}>Login</Link>
        <Link to="register" className="nav-item" style={{"--i": 3} as CSSProperties}>Sign Up</Link>
      </nav>
    </header>  )
}

export default Navbar