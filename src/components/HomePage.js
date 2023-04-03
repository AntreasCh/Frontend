/**
 * This is the homepage of the application
using bootstrap for styling it gives you all the links to navigate through the whole app
 * @author: Dimitriana Stylianou
 */
import {LinkContainer} from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Footer from './Footer';
import DesktopImg from './img/manny-pantoja-jaHvDkELPKU-unsplash.jpg';
import './Footer.css';
function homePage() {
 return (

<div className='homepage'>

 <h2>This website is ideal if you are looking for papers from specific authors</h2>
   <p2>Specifically there are many options for papers such as: </p2>
    <ul>
      <li> Interactivity</li> 
      <li> Wip</li> 
      <li> Doctoral</li>   
      <li> Fullpapers</li>  
      <li> Rapid</li>  
      <li> Competition </li> 
    </ul>
  
    <img src={DesktopImg} alt="Author's table"/>
  <p>
  <h> Photo by</h>
   <a href="https://unsplash.com/@mann_pantoja?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"> 
 { } Manny Pantoja </a> 
   on { }
   <a href="https://unsplash.com/s/photos/laptop-on-table?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
   Unsplash </a>
  
  </p>
  </div>
 );
}
export default homePage;