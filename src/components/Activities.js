
import ParentPage from './ParentPage';
import { Link } from 'react-router-dom';
import ic3Image from './ic3.jpg';
import ic3Image2 from './ic3_2.jpg';
import ic3Image3 from './ic3_3.jpg';
import ic3Image4 from './ic3_4.jpg';
import ic3Image5 from './ic3partners.png';
import React, { useState, useEffect } from 'react';
const HomePage = (props) => {
  const [text, setText] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/activitiesimg')
      .then((response) => response.json())
      .then((data) => {
        setText(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log();
    const auth = localStorage.getItem('user_type');
  if(auth==="admin")
  {
    

  }
  
return (
  <ParentPage>
          {auth === 'admin' && (
  <div className="Dataa">
    <h3>Admin Edit Web Pages</h3>
    <Link to="/admindemonstrators">
          <button type = "button" >
            Demonstrators Update
       </button>
            </Link>
            <Link to="/adminprojects">
          <button type = "button">
          Projects Update
       </button>
            </Link>
            <Link to="/admininnovation">
          <button type = "button" >
          Innovation Update
          </button>
            </Link>
            <Link to="/adminactivities">
          <button type = "button" >
          Activities Update
          </button>
            </Link>
            
  </div>
)}
{!props.loading  &&  !isLoading && (
          <div className="Dataa">
              <h2>
              {props.text.data[0]?.text && (
                <strong>
                 {props.text.data[0].text}
                </strong>
              )}
            </h2>
          
            {props.text.data[1]?.text && (
      <strong><p>{props.text.data[1].text}</p></strong>
    )}
     {props.text.data[2]?.text && (
      <p>{props.text.data[2].text}</p>
    )}
          
         
          <Link to="/contactus">
            
          <button> <strong>CONTACT US</strong><br></br> Get Involved with IC3-</button>
          </Link>


          {props.text.data[3]?.text && (
      <h3>{props.text.data[3].text}</h3>
    )}
     {props.text.data.slice(9).map((project) => (
            <div className="content-section" key={project.id}>
              <p>{project.text}</p>
            </div>
          ))}
<div className = "grid-containers">
        <div className="grid-item">
        <Link to="/demonstrators">
          <button type = "button" id = "b1" className = "small_btn"><img src={text.data[0]?.text}  className="App-logo" alt="logo"/>
          {props.text.data[4]?.text && (
      <p>{props.text.data[4].text}</p>
    )}</button>
            </Link>
        </div>
        
        <div className="grid-item">
        <Link to="/projects">
          <button type = "button" id = "b2" className = "small_btn"><img src={text.data[1]?.text}  className="App-logo" alt="logo"/>
          {props.text.data[5]?.text && (
      <p>{props.text.data[5].text}</p>)}
      </button>
            </Link>
        </div>
        <div className="grid-item">
        <Link to="/innovation">
          <button type = "button" id = "b3" className = "small_btn"><img src={text.data[2]?.text}  className="App-logo" alt="logo"/>
          {props.text.data[6]?.text && (
      <p>{props.text.data[6].text}</p>)}
          </button>
          </Link>
        </div>
        <div className="grid-item">
          <Link to="/education">
          <button type = "button" id = "b4" className = "small_btn"><img src={text.data[3]?.text}  className="App-logo" alt="logo"/>
          {props.text.data[7]?.text && (
      <p>{props.text.data[7].text}</p>)}
            </button>
            </Link>
        </div>
        <div className="grid-item b5">
        <Link to="/contactus">
        <button type="button" id="b5" className = "small_btn">
        <img src={text.data[4]?.text}  className="App-logo" alt="logo"/>
  
        {props.text.data[8]?.text && (
      <p>{props.text.data[8].text}</p>)}
  
  
</button>
</Link>

        </div>
      </div>
</div>

            
        
        )}
        {props.loading && isLoading && (
          <div className="Data">
          <h2> IC3 Activities</h2>
          <div className="loading">Loading...</div>
            
          </div>
        )}
   
        
</ParentPage>
);
};

export default HomePage;