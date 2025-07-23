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

      <section
  className="ghp-hero-section"
  id="explore"
>
  <div className="container text-center">
    <h2 className="ghp-heading">
      "Plan Smart. Travel Far."
    </h2>
    <p className="ghp-description">
      Welcome to <strong>Ghumophiro</strong>—your intelligent travel planner powered by AI.<br /><br />
      Whether you're dreaming of serene beaches, rugged mountains, vibrant cities, or offbeat adventures, we craft custom travel itineraries tailored to your style, budget, and preferences.<br /><br />
      Simply tell us your travel dates and interests, and let our AI generate a perfect, optimized plan just for you.<br /><br />
      Discover new places, avoid planning stress, and start your journey with confidence. With Ghumophiro, your next adventure is just a few clicks away.
    </p>
  </div>
</section>

    </>
  );
}

export default Home;
