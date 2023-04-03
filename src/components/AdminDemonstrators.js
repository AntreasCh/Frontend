import ParentPage from './ParentPage';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const AdminDemonstrators = (props) => {
  const [projectTitles, setProjectTitles] = useState({});
  const [newProjectText, setNewProjectText] = useState('');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    try {
      fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/demonstrators_projects')
        .then(response => response.json())
        .then(data => {
          setProjects(data.data);
          setLoading(false);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, []);
  const handleSelects = async (event, projectId) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('text', projectTitles[projectId]);
    formData.append('id', projectId);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/updatedemonstratorstext", {
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
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/demonstratorsprojecttext", {
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
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/deletedemonstratorstext", {
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
  const [title, setTitle] = useState('');

  const [mainText, setMainText] = useState('');
 
  const [img, setImg] = useState('');
  

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/insertdemonstratorsproject', {
      method: 'POST',
      body: new FormData(event.target),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'Success') {
          console.log('Project added successfully');
          // Clear the form after successful submission
          setTitle('');
         
          setMainText(''); // Fixed: clear mainText input
         
          setImg('');
         
        } else {
          console.log('Error adding project:', data.message);
        }
      })
      .catch(error => console.error(error));
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const searchedProjects = projects.filter(project => project.Title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <ParentPage>
      {!props.loading && props.text && !loading && (
        <div className='Project_Text'>
          <h2>Update  Demonstrators  Page </h2>
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
          <h2>Add New  Demonstrators Projects</h2>
          <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="Title" value={title} onChange={event => setTitle(event.target.value)} required />
      </label>
      
      <label>
        Main Text:
        <textarea name="Main_Text" value={mainText} onChange={event => setMainText(event.target.value)} required/>
      </label>
      
      <label>
        Image URL:
        <input type="text" name="img" value={img} onChange={event => setImg(event.target.value)}required />
      </label>
     
      <button type="submit">Add Project</button>
    </form>
    <h2>Edit/Delete  Projects</h2>
    <p>Search Project <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} /></p>
    <div className="project-list">
   
    {searchedProjects.map((project) => (
          <div
            className={`project-item ${
              project.status === "completed" ? "completed" : "not_completed"
            }`}
            key={project.id}
          >
           
            <div className="project-details">
            <Link to={`/updatedemonstratorsproject/${project.id}`} style={{ textDecoration: 'none' }}>
            <img src={project.img} alt={project.Title} />
            <h3>{project.Title}</h3>
            </Link>

             
              <p>{project.abstract}</p>
              <p>{project.Partners}</p>
            </div>
          </div>
        ))}
        </div>
        </div>
        
      )}
    </ParentPage>
  );
};

export default AdminDemonstrators;
