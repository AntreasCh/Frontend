import React, { useState } from 'react';
import ParentPage from './ParentPage';
import { Link } from 'react-router-dom';
import './register.css';
function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // send the registration data to the server
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('email', email);
    data.append('name', name);

    fetch('http://unn-w20017219.newnumyspace.co.uk/adduser.php', {
      method: 'POST',
      body: data
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.log(error));
    // reset the form fields
    setUsername('');
    setPassword('');
    setEmail('');
    setName('');
    
    alert("Admin will approve your request soon");
  
  };

  return (
    <ParentPage>
    <div className="registration">
       <h2 className="container__heading">Register</h2>
      <form onSubmit={handleSubmit} className="reg-form">
      <label className="reg-label">
          Name:  
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} 
         className="registration-input"
          />
        </label>
        <label className="reg-label">
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} 
          className="registration-input"
          />
        </label>
        <label className="reg-label">
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} 
          className="registration-input"
          />
        </label>
        <label className="reg-label">
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} 
          className="registration-input"
          />
        </label>
        <button type="submit"className="Reg-button">Register</button>
      </form>
     <div className="if-restriction">If you have an account please:</div>
       <Link to="/admin" className="help-link">
       click here</Link>
    </div>
    </ParentPage>
  );
}

export default RegisterPage;