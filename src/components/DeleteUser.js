import React, { useState } from 'react';

function DeleteUser({ account_id, onDeleteUser }) {
  const handleDelete = () => {
    const data = new FormData();
    data.append('account_id', account_id);

    fetch('http://unn-w20017219.newnumyspace.co.uk/deleteuser.php', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        onDeleteUser(account_id);
      })
      .catch((error) => console.log(error));
  };

  return (
    <button onClick={handleDelete} className="updatebtn" >Delete User</button>
  );
}

export default DeleteUser;
