import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const [menuOpen, setMenuOpen] = useState(false);

  

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/"> Travel Planner</Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-items ${menuOpen ? 'active' : ''}`}>

        {token ? (
          <>
            {role === 'admin' ? (
              <>
                <li><Link to="/admin">Admin Panel</Link></li>
                <li><Link to="/manageusers">Manage-user</Link></li>
                <li><Link to="/cpadmin">Update Password</Link></li>
              </>
            ) : (
              <>
                
                <li><Link to="/user">Home</Link></li>
                <li><Link to="/cpuser">Update Password</Link></li>
              </>
            )}
            
            <li><button className="nav-btn"> <Link to="/logout" >Logout</Link></button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;