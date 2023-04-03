import React, {useState, useEffect} from 'react';
import {Buffer} from 'buffer';
import Dashboard from './Dashboard';
import {LinkContainer} from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav';
import '../admin.css';
import { useNavigate } from "react-router-dom";


function AdminPage(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status,setStatus] = useState("");
  const [user_type,setUserType] = useState("");
  const storedUsername = localStorage.getItem("username");
  const storedStatus = localStorage.getItem("status");
  const storedUserType = localStorage.getItem("user_type");
  const [linkClicked,setLinkClicked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [token,setToken] = useState("");
  const navigate = useNavigate()
  useEffect(
    () => {
      if (localStorage.getItem('token')) { 
        props.handleAuthenticated(true)
      }
    }, []
  )

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleStatus = (event) => {
    setStatus (event.target.value);
  }
  const handleUserType = (event) => {
    setUserType (event.target.value);
  }

  const handleClick = () => {
    const encodedString = Buffer.from(`${username}:${password}`).toString("base64");
  
    fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/auth", {
      method: "POST",
      headers: new Headers({ Authorization: "Basic " + encodedString }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Success') {
          if(json.data.user_type ==='admin' ){
            props.handleAuthenticated(true);
            localStorage.setItem('token', json.data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('status',json.data.status);
            localStorage.setItem('user_type',json.data.user_type);
            alert("success log in");
            navigate('/admin');
          }
          else{
            // User with user_type = user can log in but won't stay logged in
           // localStorage.setItem('username', username);
          //  localStorage.setItem('password', password);
          //  localStorage.setItem('status',json.data.status);
          //  localStorage.setItem('user_type',json.data.user_type);
            navigate('/register');
          }
        } else{
          alert("User not authorised");
        }
      })
  
      .catch((e) => {
        console.log(e.message,"error");
      });
  };
  const handleDashboardClick = () => {
    localStorage.setItem('dashboardClicked', true);
  }
  
  const handleSignOut = () => {
    props.handleAuthenticated(false);
    setPassword("");
    setUsername("");
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('status');
    localStorage.removeItem('user_type');
    setLinkClicked(false);
  }

  return (
<div className="container">
    {props.authenticated && 
      <div>
        <h2>Administrator Dashboard</h2>
        <Dashboard handleUpdate={props.handleUpdate} />
        <input type="button" value="Sign out" onClick={handleSignOut} className="signout"/>
      </div>
    }
      {!props.authenticated && 
        <div>
          <h1>Sign in</h1>
          <input 
            type="text" 
            placeholder ="username"  
            value={username} 
            onChange={handleUsername} 
          />        
          <input 
            type="password" 
            placeholder="password" 
            value={password} 
            onChange={handlePassword} 
          />
          <input 
            type="button" 
            value="Submit" 
            onClick={handleClick}
          />
        </div>
      }
      { !linkClicked && !props.authenticated &&
      <div>
       If you are not registered please:
       <p><LinkContainer to="/register"><Nav.Link onClick={handleClick}> click here</Nav.Link></LinkContainer>
       </p>
      </div>
      }
     
    </div>

  )
}
export default AdminPage;