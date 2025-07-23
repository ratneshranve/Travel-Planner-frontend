import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { userApi } from '../../apiurl';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [output, setOutput] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // <-- Loading state added

  const handleSubmit = () => {
    setLoading(true); // Start loading

    const userDetail = { email, password };

    axios
      .post(userApi + 'login', userDetail)
      .then((response) => {
        const userDetail = response.data.userList;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('_id', userDetail._id);
        localStorage.setItem('name', userDetail.name);
        localStorage.setItem('email', userDetail.email);
        localStorage.setItem('password', userDetail.password);
        localStorage.setItem('role', userDetail.role);
        localStorage.setItem('status', userDetail.status);
        localStorage.setItem('info', userDetail.info);

        userDetail.role === 'user' ? navigate('/user') : navigate('/admin');
      })
      .catch(() => {
        setOutput('Login unsuccessful');
        setEmail('');
        setPassword('');
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {output && <div className="login-alert">{output}</div>}
        <h2 className="login-title">Login</h2>
        <form>
          <div className="login-group">
            <label>Email</label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="login-group">
            <label>Password</label>
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <div className="login-button-group">
            <button
              type="button"
              className="login-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" /> Please wait...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>

          <div className="login-footer">
            <p>
              Not registered?{' '}
              <span className="link-button" onClick={() => navigate('/register')}>
                Register Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
