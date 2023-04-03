import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParentPage from './ParentPage';

function UpdateProject() {
  const { ids } = useParams();
  const [message, setMessage] = useState('');
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');
 
  const [mainText, setMainText] = useState('');
 
  const [img, setImg] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.Title);
      
      setMainText(project.Main_Text);
   
      setImg(project.img);
    }
  }, [project]);
  useEffect(() => {
    fetch(`http://unn-w20017219.newnumyspace.co.uk/ic3/demonstrators_projects?id=${ids}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        return response.json();
      })
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error('No such project exists');
        }
        setProject(data.data[0]);
     
      })
      .catch((error) => {
        console.error(error);
        setMessage('No such project exists');
      });
  }, [ids]);
  
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('id', ids);
   
    formData.append('Main_Text', mainText);

    formData.append('img', img);
    fetch(`http://unn-w20017219.newnumyspace.co.uk/ic3/updatedemonstratorsproject`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'Success') {
          console.log(data);
          alert("Project Updated")
          // No need to clear the form after successful update
        } else {
          console.log('Error updating project:', data.message);
        }
      })
      .catch(error => console.error(error));
  }
  if (!project) {
    return (
      <div>
        {message ? (
          <ParentPage>
            <div className="message">
              <h2>{message}</h2>
            </div>
          </ParentPage>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }
  const ProjectDelete = async (event, projectId) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', ids);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/deletedemonstratorsproject", {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Project Deleted');
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
      <div  className="imgshowcase">
      <img src={project.img} alt={project.Title}/>
    
      </div>
      
     
    <div class="updateprojectrow">

            <form onSubmit={handleSubmit}>
                <label>
                  Title:
                  <input type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} required />
                </label>
               
                    <label>
                    Main Text:
                    <textarea name="mainText" value={mainText} onChange={event => setMainText(event.target.value)} required/>
                    </label>
                    <label>
                    Image URL:
                    <input type="text" name="img" value={img} onChange={event => setImg(event.target.value)}required />
                    </label>
                    <button type="submit">Update Project</button>
                    <br></br>
                    <button onClick={(event) => ProjectDelete(event, ids)}>Delete Project</button>
                    </form>
                   
          
    </div>

    </ParentPage>
  );
}

export default UpdateProject;
