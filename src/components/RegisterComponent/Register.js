import './Register.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../apiurl'; // Adjust path as needed


function Register() {
  const navigate = useNavigate();
  const [output, setOutput] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const userData = { name, email, password };

    axios
  .post(`${userApi}save`, userData)
  .then(() => {
    navigate('/login');
  })

      .catch(() => {
        setOutput('Registration failed');
        setName('');
        setEmail('');
        setPassword('');
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
            />
          </div>

          <div className="d-grid mb-3">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Register
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
