import { useState, CSSProperties } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from '../Context';

const Navbar = () => {
    const [showIcon, setShowIcon] = useState<boolean>(true);
    const { user, setUser } = useContext();

    const navigate = useNavigate();

    const signOutClick = () => {
      setUser(null)
      navigate("/");
    }
    
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
        {user ? <>
          <Link to="/login" className="nav-item" style={{"--i": 2} as CSSProperties}>Profile</Link>
          <a onClick={signOutClick} className="nav-item" style={{"--i": 3} as CSSProperties}>Sign Out</a>
          </>
        :
        <>
          <Link to="/login" className="nav-item" style={{"--i": 2} as CSSProperties}>Login</Link>
          <Link to="register" className="nav-item" style={{"--i": 3} as CSSProperties}>Sign Up</Link>
          </>
        }
      </nav>
    </header>  )
}

export default Navbar