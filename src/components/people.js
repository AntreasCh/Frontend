import React, { useEffect, useState } from 'react';
import ParentPage from './ParentPage';


function People() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

 
  useEffect( () => {
    fetch("http://unn-w20017219.newnumyspace.co.uk/group/people")
    .then(
        (response) => response.json()
    )
    .then(
        (json) => {
            console.log(json);
            setUsers(json.data)
            setLoading(false);
        }
    )
    .catch(
        (e) => {
            console.log(e.message)
        }
    )
},[]);


  return (
    <ParentPage>
<div>

        
{users.map((user) => (
            <div key={user.id}>
             {user.name}
             <img src={user.picture_url} alt={user.name} />
           
            
              
            </div>
          ))}
 
            </div>
    </ParentPage>
  );
      }
      export default People;