import React, { useEffect, useState, useRef } from 'react';
import { HeaderWrapper, H3 } from './style';
import ParentPage from './ParentPage';
import Slider1 from './slider';
import Slider2 from './slider2';

function About(props) {
  const aboutRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  const handleLearnMoreClick = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <ParentPage>
      <HeaderWrapper>
        <H3>
          <strong>IC3: THE INTERNATIONAL CENTRE FOR CONNECTED CONSTRUCTION</strong>
          
        </H3>
        
        <div className="atb">
        <button onClick={() => {window.location.href = '/tppfront/contactus';}}>Contact Us</button>
       
       
        </div>
      </HeaderWrapper>
      <div ref={aboutRef}>
        <div className='aboutus'>
        {props.about
.filter(desc => (desc.id >= 1 && desc.id <= 10) || desc.id >= 15)
.map(desc => (
    <div key={desc.id} style={{ marginBottom: desc.id >= "4" && desc.id <= "9" ? "10px" : "35px" }}>
      {desc.id === "1" || desc.id === "3" ?
        <strong>{desc.description}</strong> :
        (desc.id >= "4" && desc.id <= "9" ? `• ${desc.description}` : desc.description)
      }
    </div>
  ))
}


        </div>
      </div>
      <div className='people'>
        <div>
        {props.about
  .filter(desc => desc.id >= 11 && desc.id <= 12).map(desc => (
  <div key={desc.id}>
      {desc.id === "11" && <h2>{desc.description}</h2>}
      {desc.id === "12" && <p>{desc.description}</p>}

  </div>
))}        </div>
        <br/>
        
      <br/>
      <div>
        <Slider1 />
      </div>
            </div>
            <div className='partners'>
            <div>
        {props.about
  .filter(desc => desc.id >= 13 && desc.id <= 14).map(desc => (
  <div key={desc.id}>
      {desc.id === "13" && <h2>{desc.description}</h2>}
      {desc.id === "14" && <p>{desc.description}</p>}

    
  </div>
))}        </div>
        <br/>
        <br/>
              <div>
            <Slider2 />
          </div>
 </div>
           
    </ParentPage>
  );
}

export default About;
