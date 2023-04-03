import React, { useEffect, useState } from 'react';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import UpdatePassword from './UpdatePassword';
import './dashboard.css';
function Dashboard(props) {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [addUserVisible, setAddUserVisible] = useState(true);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/dashboard',
    {
      headers: new Headers( { "Authorization": "Bearer " + token})
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUsers(json.data);
        setLoading(false);    
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleAddUser = (user) => {

   if (selectedUser) {
    setSelectedUser(null);
    setVisible(true);
  } else {
    setAddUserVisible(false);
    setVisible(true);
  }
};

  const handleEditClick = (user) => {
    if (visible) {
      setVisible(false);
    }
    setSelectedUser(user);
  };
  
  const handleUpdateUser = (updatedUserData) => {
    const updatedUsers = users.map((user) => {
      if (user.account_id === updatedUserData.account_id) {
        return { ...user, ...updatedUserData };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
    setSelectedUser(null);
  };
  const handleAddUserClick = () => {
    setAddUserVisible(false);
    setVisible(true);
  }


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.account_id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.user_type}</td>
              <td>
                <button onClick={() => handleEditClick(user)} className="dash-button ">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visible && <AddUser onAddUser={handleAddUser} setVisible={setVisible} />}
      {selectedUser && (
        <UpdateUser
          user={selectedUser}
          onUpdateUser={handleUpdateUser}
          setSelectedUser={setSelectedUser}
        />
      )}
         {selectedUser && (
        <UpdatePassword
          user={selectedUser}
          onUpdateUser={handleUpdateUser}
          setSelectedUser={setSelectedUser}
        />
      )}
        { addUserVisible  && <button onClick={handleAddUserClick} className="dash-button ">Add User</button>}
    </div>
  );
}

export default Dashboard;
