import './Register.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [output, setOutput] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // <-- Added

  const handleSubmit = () => {
    setLoading(true); // Show loader

    const userData = { name, email, password };

    axios
      .post('http://localhost:3001/user/save', userData)
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        setOutput('Registration failed');
        setName('');
        setEmail('');
        setPassword('');
      })
      .finally(() => {
        setLoading(false); // Hide loader
      });
  };

  return (
    <div className="register-page">
      <div className="form-card">
        {output && <div className="alert alert-danger text-center">{output}</div>}
        <h2 className="text-center">Register</h2>
        <form>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <div className="d-grid mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" /> Please wait...
                </>
              ) : (
                'Register'
              )}
            </button>
          </div>

          <div className="text-center">
            <p>
              Already registered?{' '}
              <span className="link-button" onClick={() => navigate('/login')}>
                Login Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
