import React, { useState } from 'react';
import '../adduser.css';
import Dashboard from './Dashboard';

function AddUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [user_type, setUserType] = useState('');
  const [status,setStatus] = useState('');
  const [visible,setVisible]=useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('username', username);
    data.append('password', password); 
    data.append('email', email);
    data.append('name', name);
    data.append('user_type', user_type);
    data.append('status', status);
   
    // Hash the password
    const encryptedPassword = btoa(password);
    data.append('encryptedPassword', encryptedPassword);
    fetch('http://unn-w20017219.newnumyspace.co.uk/adduser.php', {
      method: 'POST',
      body: data
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        alert('Please reload the page to see the new user');
      })
      .catch(error => console.log(error));
  };
  const handleCancel = () => {
    setVisible(true);
  };

  const handleAddUser = () => {
    setVisible(false);
  };
  return (
<div>
{visible ? (
        <button onClick={handleAddUser} className="dash-button">Add User</button>
      ) : (
    <form onSubmit={handleSubmit}className="my-form">
      <p> Add user form</p>
        <label className='addlabel'>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} 
        className="addinput"
        />
      </label>
      <label className='addlabel'>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}
        className="addinput"
        />
      </label>
      <label className='addlabel'>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} 
        className="addinput"
        />
      </label>
      <label className='addlabel'>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} 
        className="addinput"
        />
      </label>
      <label className='addlabel'>
        Status:
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="addinput">
        <option value=""></option>
    <option value="approved">Approved</option>
    <option value="pending">Pending</option>
  </select> 
      </label>
      <label className='addlabel'>
        User type:
        <select value={user_type} onChange={(event) => setUserType(event.target.value)} className="addinput">
        <option value=""></option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
      </label>
      <div className="button-cont">
      <button type="submit" className='myButton'>Submit</button>
      <button type="button" className='myButton' onClick={handleCancel} >Cancel</button>
      </div>
    </form>
      )}
      </div>
  );
}

export default AddUser;
