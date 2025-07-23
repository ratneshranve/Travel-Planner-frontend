import './Footer.css';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
function Footer() {
  const[footerContent,setFooterContent]=useState();
  useEffect(()=>{
    setInterval(()=>{
        if(localStorage.getItem('role')=='user'){
            setFooterContent(
                <>
                <footer className="footer">
      

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GhumoPhiro. All rights reserved.</p>
      </div>
    </footer>
                </>
            );
        }else if(localStorage.getItem('role')=='admin'){
            setFooterContent(
                <>
                <footer className="footer">
      

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GhumoPhiro. All rights reserved.</p>
      </div>
    </footer>
                </>
            );
        }else{
            setFooterContent(
                <>
                <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <h3>GhumoPhiro</h3>
          <p>Making your journeys smarter and smoother using AI-powered travel recommendations.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
           
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@ghumophiro.ai</p>
          <p>Phone: +91 9770133148</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GhumoPhiro. All rights reserved.</p>
      </div>
    </footer>
                
                </>
            );
        }
    });
  },1);

  return (
    <>
    {
        footerContent
    }
     
    </>
  );
}

export default Footer;