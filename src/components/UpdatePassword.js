import React, { useState } from 'react';
import '../update.css';
function UpdatePassword({props, user, setSelectedUser, setUserList }) {
  const [password, setPassword] = useState(user.password);  
  const [account_id, setAccountID] = useState(user.account_id);

  const updateUser = (updatedUser) => {
    setUserList((prevUserList) => {
      const updatedUserList = prevUserList.map((user) => {
        if (user.account_id === updatedUser.account_id) {
          return updatedUser;
        }
        return user;
      });
      return updatedUserList;
    });
    setSelectedUser(null);
  };


  const handleCancel = () => {
    setSelectedUser(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('account_id', account_id);
    data.append('password',password);

    const token = localStorage.getItem("token");
 // Hash the password
const encryptedPassword = btoa(password);

data.append('encryptedPassword', encryptedPassword);
    fetch('http://unn-w20017219.newnumyspace.co.uk/updatePassword.php', {
      method: 'POST',
      headers: new Headers( { "Authorization": "Bearer " + token}),
      body: data,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        alert('User updated successfully. Please reload the page.');
        const updatedUser = {
          account_id: account_id,
          password:password,
        };
        setSelectedUser(null);
        updateUser(updatedUser);
        props.handleUpdate();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="updateform">
      <form onSubmit={handleSubmit} >
      <p> Update password</p>
    
        <label className="update-label">
         <span>Password:</span> 
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="update-field"
          />
      </label>
      <div className='updateButtonsContainer'>
      <button type="submit" className="updatebtn">Update password</button>
      <button type="button" onClick={handleCancel}className="updatebtn">Cancel</button>
      </div>
   </form>
  </div>
);
  }
  export default UpdatePassword;