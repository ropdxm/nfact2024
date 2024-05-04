import { useState } from 'react';
import './navbar.css';

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
        <a href="#" className="nav-item" style={{"--i": 0} as React.CSSProperties}>Home</a>
        <a href="#" className="nav-item" style={{"--i": 1} as React.CSSProperties}>Plan Your Visit</a>
        <a href="#" className="nav-item" style={{"--i": 2} as React.CSSProperties}>Magical Places</a>
        <a href="#" className="nav-item" style={{"--i": 3} as React.CSSProperties}>Contact</a>
      </nav>
    </header>  )
}

export default Navbar