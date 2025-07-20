import './Home.css';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <>
      <section className="tp-hero-section">
        <div className="tp-hero-overlay">
          <div className="tp-hero-content text-center">
            <h1 className="tp-hero-title">Discover. Plan. Explore.</h1>
            <p className="tp-hero-subtitle">
              Your next adventure starts here. Our AI-powered assistant creates personalized travel plans just for you — fast, easy, and unforgettable.
            </p>
            <a> <Link  className="tp-btn-primary" to="/register">Start Exploring</Link></a>
          </div>
        </div>
      </section>

      <section className="tp-message-section" id="explore">
        <div className="container text-center">
          <h2 className="tp-message-heading">"One Life, Many Journeys"</h2>
          <p className="tp-message-text">
            Join a community of travelers sharing unforgettable stories. Whether it’s mountains, beaches,
            cities or culture — your travel dreams are valid. Let us help you turn plans into reality.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
