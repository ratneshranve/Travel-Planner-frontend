import './Nav.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    setMenuOpen(false); // close mobile nav on route change
  }, [location]);

  return (
    <nav className={`tp-navbar ${scrolled ? 'tp-scrolled' : ''}`}>
      <div className="tp-container">
        <Link className="tp-navbar-brand" to="/">
          <img src="./assets/images/logo.png" className="tp-logo" alt="Logo" />
          <span>
            Travel-Planner
            <small>enjoy-every-moment</small>
          </span>
        </Link>

        <button
          className="tp-menu-toggle"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className={`tp-collapse tp-navbar-collapse ${menuOpen ? 'active' : ''}`}>
          <ul className="tp-navbar-nav">
            {role === 'user' && (
              <>
                <li className="tp-nav-item"><Link className="tp-nav-link" to="/user">Home</Link></li>
                <li className="tp-nav-item"><Link className="tp-nav-link" to="/cpuser">Update Password</Link></li>
                <li className="tp-nav-item"><Link className="tp-nav-link" to="/itinerary">Itinerary</Link></li>
                <li className="tp-nav-item"><Link className="tp-nav-link tp-btn" to="/logout">Logout</Link></li>
              </>
            )}

            {role === 'admin' && (
              <>
                <li className="tp-nav-item"><Link className="tp-nav-link" to="/admin">Admin Home</Link></li>
                <li className="tp-nav-item"><Link className="tp-nav-link" to="/manageusers">Manage Users</Link></li>
                <li className="tp-nav-item"><Link className="tp-nav-link" to="/cpadmin">Update Password</Link></li>
                <li className="tp-nav-item"><Link className="tp-nav-link tp-btn" to="/logout">Logout</Link></li>
              </>
            )}

            {!role && (
              <>
                <li className="tp-nav-item"><Link className="tp-nav-link" to="/">Home</Link></li>
                <li className="tp-nav-item"><Link className="tp-nav-link" to="/register">Register</Link></li>
                <li className="tp-nav-item"><Link className="tp-nav-link tp-btn" to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
