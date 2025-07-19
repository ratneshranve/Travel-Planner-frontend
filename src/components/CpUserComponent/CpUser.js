import './CpUser.css';
import { useState } from 'react';
import axios from 'axios';
import { userApi } from '../../apiurl';
import { useNavigate } from 'react-router-dom';

function CpUser() {
  const [output, setOutput] = useState('');
  const [opass, setOPass] = useState('');
  const [npass, setNPass] = useState('');
  const [cnpass, setCnPass] = useState('');
 
  const Navigate = useNavigate();

  const handleSubmit = () => {
    const email = localStorage.getItem('email');
    if (!opass || !npass || !cnpass) {
      setOutput("All fields are required");
      return;
    }

    if (npass !== cnpass) {
      setOutput("New password and confirm password do not match");
      setNPass('');
      setCnPass('');
      return;
    }

    axios.get(`${userApi}fetch?email=${email}&password=${opass}`)
      .then(response => {
        if (response.data.length > 0) {
          const updateDetail = {
            condition_obj: { email },
            content_obj: { password: npass }
          };

          axios.patch(`${userApi}update`, updateDetail)
            .then(() => {
              setOutput("Password changed successfully");
              setOPass('');
              setNPass('');
              setCnPass('');
               alert("password changed successfully")
              Navigate('/user');
            })
            .catch(() => {
              setOutput("Failed to change password");
            });
        } else {
          setOutput("Old password is incorrect");
          setOPass('');
        }
      })
      .catch(() => {
        setOutput("Server error while verifying password");
      });
  };

  return (
    <div className="cpadmin-container">
      <h2 className="form-title">Change Password</h2>
      {output && <div className="output-msg">{output}</div>}

      <form className="cpadmin-form">
        <label>Old Password:</label>
        <input
          type="password"
          value={opass}
          onChange={e => setOPass(e.target.value)}
        />

        <label>New Password:</label>
        <input
          type="password"
          value={npass}
          onChange={e => setNPass(e.target.value)}
        />

        <label>Confirm New Password:</label>
        <input
          type="password"
          value={cnpass}
          onChange={e => setCnPass(e.target.value)}
        />

        <button type="button" onClick={handleSubmit}>
          Change Password
        </button>
      </form>
    </div>
  );
}

export default CpUser;
