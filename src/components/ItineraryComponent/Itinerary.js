import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Itinerary.css";

function Itinerary() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState(1); // 👥 New: number of people
  const [tripType, setTripType] = useState("friends"); // 👫 New: couple/family/friends

  const [interests, setInterests] = useState({
    food: false,
    mountains: false,
    beaches: false,
    history: false,
    adventure: false,
  });

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setInterests({ ...interests, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedInterests = Object.entries(interests)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    const itineraryData = {
      destination,
      startDate: date,
      days: parseInt(days),
      budget: Math.round(Number(budget)),
      people: parseInt(people),      // 👥 Pass number of people
      tripType,                      // 👫 Pass trip type
      interests: selectedInterests,
    };

    navigate("/travelplan", { state: itineraryData });
  };

  return (
    <div className="itinerary-page">
      <div className="itinerary-box">
        <h2>Create Your Travel Itinerary</h2>
        <form onSubmit={handleSubmit}>
  <div className="itinerary-group">
    <label>Destination:</label>
    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
  </div>

  <div className="itinerary-group">
    <label>Start Date:</label>
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
  </div>

  <div className="inline-group">
    <div className="itinerary-group">
      <label>Days:</label>
      <input type="number" value={days} onChange={(e) => setDays(e.target.value)} required min="1" />
    </div>

    <div className="itinerary-group">
      <label>Budget (₹):</label>
      <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required min="0" />
    </div>
  </div>

  <div className="inline-group">
    <div className="itinerary-group">
      <label>People:</label>
      <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} required min="1" />
    </div>

    <div className="itinerary-group">
      <label>Trip Type:</label>
      <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
        <option value="friends">Friends</option>
        <option value="couple">Couple</option>
        <option value="family">Family</option>
      </select>
    </div>
  </div>

  <div className="itinerary-group">
    <label>Interests:</label>
    <div className="interests-toggle-buttons">
      {Object.keys(interests).map((interest) => (
        <button
          type="button"
          key={interest}
          className={`toggle-button ${interests[interest] ? "active" : ""}`}
          onClick={() =>
            setInterests((prev) => ({ ...prev, [interest]: !prev[interest] }))
          }
        >
          {interest.charAt(0).toUpperCase() + interest.slice(1)}
        </button>
      ))}
    </div>
  </div>

  <button type="submit">Submit Itinerary</button>
</form>

      </div>
    </div>
  );
}

export default Itinerary;
