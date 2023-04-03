import React, { useEffect, useState, useRef } from 'react';
import { HeaderWrapper, H3 } from './style';
import ParentPage from './ParentPage';
import AdminSlider1 from '../adminslider';
import AdminSlider2 from './adminslider2';

function AdminAbout(props) {
  const aboutRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  const handleLearnMoreClick = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('description', description);
    formData.append('id', id);
  
    const token = localStorage.getItem('token');
  
    console.log('Submitting form data:', formData);
  
    try {
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/update", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log('Server response:', response);
  
      if (response.ok) {
        alert('Reload Page');
        setShowForm(false);
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log('Error:', error.message);
      // Display error message to user here
    }
  };
  
  const handleAddText = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('description', description);
  
    try {
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/inserttext", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        setDescription('');
        alert('New Text added');
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
      // Display error message to user here
    }
  };
  
  
  
  const handleCancelClick = () => {
    setShowForm(false);
    setDescription('');
  };

  return (
    <ParentPage>
      <HeaderWrapper>
        <H3>
          <strong>IC3: THE INTERNATIONAL CENTRE FOR CONNECTED CONSTRUCTION</strong>
        </H3>
        <div className="atb">
         <div> <button onClick={handleLearnMoreClick}>Learn More</button></div>
         <button onClick={() => {window.location.href = '/contactus';}}>Contact Us</button>
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
      {desc.id && 
        <button onClick={() => { setShowForm(true); setId(desc.id); setDescription(desc.description); }}>Edit</button>
      }
    </div>
  ))
}
<button onClick={() => { setShowForm(true); handleAddText(); }}>Add Text</button>


          {showForm && (
            <form className='formtext' onSubmit={handleSubmit}>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
          )}
        </div>
      </div>
      <div className='people'>
        <div>
        {props.about
  .filter(desc => desc.id >= 11 && desc.id <= 12).map(desc => (
  <div key={desc.id}>
      {desc.id === "11" && <h2>{desc.description}</h2>}
      {desc.id === "12" && <p>{desc.description}</p>}

    {desc.id && 
      <button onClick={() => { setShowForm(true); setId(desc.id); setDescription(desc.description); }}>Edit</button>
    }
  </div>
))}        </div>
        <br/>
        
      <br/>
      <div>
        <AdminSlider1 />
      </div>
            </div>
            <div className='partners'>
            <div>
        {props.about
  .filter(desc => desc.id >= 13 && desc.id <= 14).map(desc => (
  <div key={desc.id}>
      {desc.id === "13" && <h2>{desc.description}</h2>}
      {desc.id === "14" && <p>{desc.description}</p>}

    {desc.id && 
      <button onClick={() => { setShowForm(true); setId(desc.id); setDescription(desc.description); }}>Edit</button>
    }
  </div>
))}        </div>
        <br/>
        <br/>
              <div>
            <AdminSlider2 />
          </div>
 </div>
           
    </ParentPage>
  );
}

export default AdminAbout;
