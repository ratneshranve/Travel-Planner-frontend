import './Nav.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [navContent,setNavContent]=useState();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
  
    setInterval(() => {
      if(localStorage.getItem('role')==="user") { 
        setNavContent(
          <>
          <nav className={`tp-navbar navbar-expand-lg tp-shadow-lg ${scrolled ? 'tp-scrolled' : ''}`}>
            <div className="tp-container">
              <a className="tp-navbar-brand" href="index.html">
                <img src="./assets/images/logo.png" className="tp-logo tp-img-fluid" alt="Kind Heart Charity" />
                <span>
                  Travel-Planner
                  <small>enjoy-every-moment</small>
                </span>
              </a>

              

              <div className="tp-collapse tp-navbar-collapse" id="navbarNav">
                <ul className="tp-navbar-nav ms-auto">
                  <li className="tp-nav-item">
                    <Link className="tp-nav-link tp-click-scroll" to="/user">Home</Link>
                  </li>
                  <li className="tp-nav-item">
                    <Link className="tp-nav-link tp-click-scroll" to="/cpuser">Update Password</Link>
                  </li>
                  <li className="tp-nav-item">
                    <Link className="tp-nav-link tp-click-scroll" to="/itinerary">Itinerary</Link>
                  </li>
                  <li className="tp-nav-item ms-3">
                    <a className="tp-nav-link tp-btn tp-border-btn btn"><Link to="/logout">Logout</Link></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </>
        )
      } else if(localStorage.getItem('role')==="admin") {
        setNavContent(
          <>
          <nav className={`tp-navbar navbar-expand-lg tp-shadow-lg ${scrolled ? 'tp-scrolled' : ''}`}>
            <div className="tp-container">
              <a className="tp-navbar-brand" href="index.html">
                <img src="./assets/images/logo.png" className="tp-logo tp-img-fluid" alt="Kind Heart Charity" />
                <span>
                  Travel-Planner
                  <small>enjoy-every-moment</small>
                </span>
              </a>

              

              <div className="tp-collapse tp-navbar-collapse" id="navbarNav">
                <ul className="tp-navbar-nav ms-auto">
                  <li className="tp-nav-item">
                    <Link className="tp-nav-link tp-click-scroll" to="/admin">Admin_Home</Link>
                  </li>
                  <li className="tp-nav-item">
                    <Link className="tp-nav-link tp-click-scroll" to="/manageusers">Manage users</Link>
                  </li>
                  
                  <li className="tp-nav-item">
                    <Link className="tp-nav-link tp-click-scroll" to="/cpadmin">Update Password</Link>
                  </li>
                  <li className="tp-nav-item ms-3">
                    <a className="tp-nav-link tp-btn tp-border-btn btn"><Link to="/logout">Logout</Link></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </>
        )
      } else {
        setNavContent(
          <>
          <nav className={`tp-navbar navbar-expand-lg tp-shadow-lg ${scrolled ? 'tp-scrolled' : ''}`}>
            <div className="tp-container">
              <a className="tp-navbar-brand" href="index.html">
                <img src="./assets/images/logo.png" className="tp-logo tp-img-fluid" alt="Kind Heart Charity" />
                <span>
                  Travel-Planner
                  <small>enjoy-every-moment</small>
                </span>
              </a>

              <div className="tp-collapse tp-navbar-collapse" id="navbarNav">
                <ul className="tp-navbar-nav ms-auto">
                  <li className="tp-nav-item">
                    <Link className="tp-nav-link tp-click-scroll" to="/">Home</Link>
                  </li>
                  
                  <li className="tp-nav-item">
                    <Link className="tp-nav-link tp-click-scroll" to="/register">Register</Link>
                  </li>
                  <li className="tp-nav-item ms-3">
                    <a className="tp-nav-link tp-btn tp-border-btn btn"><Link to="/login">Login</Link></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </>
        )
      }

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);

    }, 1)
  }, []);
    
  return (
    <>
      {navContent}
    </>
  );
}

export default Nav;
