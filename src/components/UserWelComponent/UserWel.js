import React from 'react';
import './UserWel.css';
import { useNavigate } from 'react-router-dom';

function UserWel() {
  const name = localStorage.getItem('name') || 'Traveler';
  const navigate = useNavigate();

  const handleGeneratePlan = () => {
    navigate('/itinerary');
  };

  return (
    <div className="tp-user-welcome">
      <div className="tp-welcome-box">
        <h1>Welcome, {name}!</h1>
        <p className="tp-subtext">Ready to explore your next adventure?</p>
        <button className="tp-generate-btn" onClick={handleGeneratePlan}>
          Generate Travel Plan
        </button>
      </div>
    </div>
  );
}

export default UserWel;
