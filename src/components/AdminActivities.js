import ParentPage from './ParentPage';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const AdminDemonstrators = (props) => {
  const [projectTitles, setProjectTitles] = useState({});
  const [newProjectText, setNewProjectText] = useState('');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
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
  
  
  const handleSelects = async (event, projectId) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('text', projectTitles[projectId]);
    formData.append('id', projectId);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/updateactivitiestext", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Title updated');
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
      // Display error message to user here
    }
  };
  const handleSelectss = async (event, projectId) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('text', projectTitles[projectId]);
    formData.append('id', projectId);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/updateactivitiesimg", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Title updated');
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
      // Display error message to user here
    }
  };

  const onTextareaChange = (event, projectId) => {
    setProjectTitles((prevState) => ({
      ...prevState,
      [projectId]: event.target.value
    }));
  };

  const handleAddProject = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('text', newProjectText);
    
    try {
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/insertactivitiestext", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
     
      });

      if (response.ok) {
        setNewProjectText('');
        alert('New project added');
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
      // Display error message to user here
    }
  };
  const onDeleteButtonClick = async (event, projectId) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', projectId);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/deleteactivitiestext", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Project deleted');
        // Remove the project from the state
        setProjectTitles((prevState) => {
          const newState = { ...prevState };
          delete newState[projectId];
          return newState;
        });
      } else {
        throw new Error('Fetch failed with status ' + response.status);
      }
    } catch (error) {
      console.log(error.message);
      // Display error message to user here
    }
  };


  
  return (
    <ParentPage>
      {!props.loading && props.text  && !isLoading && (
        <div className='Project_Text'>
          <h2>Update  Activities  Page </h2>
          {props.text.data.map((project) => (
            <div classnamwe="big_btn" key={project.id}>

              <textarea
                value={projectTitles[project.id] ?? project.text}
                onChange={(event) => onTextareaChange(event, project.id)}
                className="growInput"
                rows="10"
                cols="50"
              />
              <button onClick={(event) => handleSelects(event, project.id)}>Change</button>
              <button onClick={(event) => onDeleteButtonClick(event, project.id)}>Delete</button>
            </div>
          ))}
          <h2>Add New Text</h2>
          <div className="form">
            <textarea
              value={newProjectText}
              onChange={(event) => setNewProjectText(event.target.value)}
              className="growInput"
              rows="10"
              cols="50"
            />
            <button onClick={handleAddProject}>Add</button>

           
          </div>
          
          <h2>Change Images Urls </h2>
          {text.data.map((project) => (
            <div classnamwe="big_btn" key={project.id}>

              <textarea
                value={projectTitles[project.id] ?? project.text}
                onChange={(event) => onTextareaChange(event, project.id)}
                className="growInput"
                rows="10"
                cols="50"
              />
              <button onClick={(event) => handleSelectss(event, project.id)}>Change</button>
            </div>
          ))}
          
   
   
        </div>
        
      )}
    </ParentPage>
  );
};

export default AdminDemonstrators;
