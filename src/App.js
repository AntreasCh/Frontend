import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Activities from './components/Activities';
import Events from './components/events';

import AdminEvents from './components/adminevents';
import { useLocation } from 'react-router-dom';
import ContactUs from './components/contactus';
import Projects from './components/Projects';
import ShowProject from './components/ShowProject';
import Demonstrators from './components/Demonstrators';
import AdminProjects from './components/AdminProjects';
import Education from './components/education';
import AdminEducation from './components/admineducation';
import UpdateProject from './components/UpdateProject';
import AdminDemonstrators from './components/AdminDemonstrators';
import UpdateDemonstratorsProject from './components/UpdateDemonstratorsProject';
import AdminActivities from './components/AdminActivities';
import Innovation from './components/Innovation';
import AdminInnovation from './components/AdminInnovation';
import UpdateInnovationProjects from './components/UpdateInnovationProjects';
import Submissions from './components/submissions';
import About from './components/about';
import People from './components/people';
import AdminAbout from './components/adminabout';
import Dashboard from './components/Dashboard';
 import AdminPage from './components/AdminPage';
 
import UpdateUser from './components/UpdateUser';
import AddUser from './components/AddUser';
import RegisterPage from './components/RegisterPage';
import DeleteUser from'./components/DeleteUser';

function App() {
  const [text, setText] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [project_text, setProject_Text] = useState([]);
const [isLoadingProject, setIsLoadingProject] = useState(true);
const [demonstrators_text, setDemonstrators] = useState([]);
const [isLoadingDemonstrators, setIsLoadingDemonstrators] = useState(true);
const [innovation_text, setInnovation] = useState([]);
const [isLoadingInnovation, setIsLoadingInnovation] = useState(true);
const [submissions, setSubmissions] = useState([]);
const [about, setAbout] = useState([]);




  const auth = localStorage.getItem('user_type');
 

useEffect(() => {
  setIsLoading(true);
  fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/activities')
    .then((response) => response.json())
    .then((data) => {
      setText(data);
      setIsLoading(false);
    })
    .catch((error) => console.error(error));
}, []);
useEffect(() => {
  setIsLoading(true);
  fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/demonstrators_text')
    .then((response) => response.json())
    .then((data) => {
      setDemonstrators(data);
      setIsLoadingDemonstrators(false);
    })
    .catch((error) => console.error(error));
}, []);


useEffect(() => {
  setIsLoadingProject(true);
  fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/projects_text')
    .then((response) => response.json())
    .then((data) => {
      setProject_Text(data);
      setIsLoadingProject(false);
    })
    .catch((error) => console.error(error));
}, []);

useEffect(() => {
  setIsLoading(true);
  fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/innovation_text')
    .then((response) => response.json())
    .then((data) => {
      setInnovation(data);
      setIsLoadingInnovation(false);
    })
    .catch((error) => console.error(error));
}, []);

useEffect( () => {
    
  fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/submissions")
  .then(
      (response) => response.json()
  )
  .then(
      (json) => {
          setSubmissions(json.data)
          setIsLoading(false)
      }
  )
  .catch(
      (e) => {
          console.log(e.message)
      }
  )
},[]);
useEffect(() => {
fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/about")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    setAbout(json.data);
    setIsLoading(false);
  })
  .catch((e) => {
    console.log(e.message);
  });
}, []);
const [users,setUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const[authenticated, setAuthenticated]=useState(false);
   const handleAuthenticated = (isAuthenticated) => {setAuthenticated(isAuthenticated)}
   const [update,setUpdated] = useState(0);

   useEffect( () => {
       fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/dashboard")
       .then(
           (response) => response.json()
       )
       .then(
           (json) => {
               setUsers(json.data)
               setLoading(false)
               console.log(json.data)
           }
       )
       .catch(
           (e) => {
               console.log(e.message)
           }
       )
   },[update]);
 
   const handleUpdate = () => {setUpdated(update+1)}
   if (auth === 'admin') {
    return (
      <Routes>
        
      <Route path="/adminevents" element={<AdminEvents />}/>
      <Route path="/admineducation" element={<AdminEducation />}/>
      <Route path="/activities" element={<Activities text={text} loading={isLoading}/>}/>
      
      
      <Route path="/adminactivities" element={<AdminActivities  text={text} loading={isLoading}/>}/>
      <Route path="/events" element={<Events />}/>
      <Route path="/education" element={<Education />}/>
     
      <Route path="/showproject/:ids" element={<ShowProject  />} />
      <Route path="/updateproject/:ids" element={<UpdateProject  />} />
      <Route path="/updatedemonstratorsproject/:ids" element={<UpdateDemonstratorsProject  />} />
      <Route path="/projects" element={<Projects  text={project_text} loading={isLoadingProject}/>}/>
      <Route path="/adminprojects" element={<AdminProjects  text={project_text} loading={isLoadingProject}/>}/>
      <Route path="/demonstrators" element={<Demonstrators  text={demonstrators_text} loading={isLoadingDemonstrators}/>}/>
      <Route path="/admindemonstrators"  element={<AdminDemonstrators  text={demonstrators_text} loading={isLoadingDemonstrators}/>}/>
      <Route path="/updateinnovationproject/:ids" element={<UpdateInnovationProjects  />} />
      <Route path="/innovation" element={<Innovation  text={innovation_text} loading={isLoadingInnovation}/>}/>
      <Route path="/admininnovation" element={<AdminInnovation   text={innovation_text} loading={isLoadingInnovation}/>}/>


      <Route path="/contactus" element={<ContactUs />}/>
      <Route path="/people" element={<People />}/>

      <Route path="/submissions" element={<Submissions submissions={submissions} loading={isLoading}/>}/>
      <Route path="/about" element={<About about={about} loading={isLoading} />}/>
      <Route path="/adminabout" element={<AdminAbout about={about} loading={isLoading} />}/>
      <Route path="/admin" element={ <AdminPage users={users} authenticated={authenticated} 
        handleAuthenticated={handleAuthenticated} 
        handleUpdate={handleUpdate} />}  />
     
        <Route path="/delete" element ={<DeleteUser />} />
        <Route path="/register" element ={<RegisterPage />} />
        <Route path="/addUser" element ={<AddUser users={users}  />} />
        <Route path="/update" element={ <UpdateUser users={users}  authenticated={authenticated} 
        handleAuthenticated={handleAuthenticated}  handleUpdate={handleUpdate}/>} />

      <Route path="*" element={<p>Not Found</p>} />
    </Routes>
    );
  }

  return (
    <div className="App">
    
      <Routes>
        
        
       
        <Route path="/activities" element={<Activities text={text} loading={isLoading}/>}/>
        
        
      
        <Route path="/events" element={<Events />}/>
        <Route path="/education" element={<Education />}/>
       
        <Route path="/showproject/:ids" element={<ShowProject  />} />
        
        <Route path="/projects" element={<Projects  text={project_text} loading={isLoadingProject}/>}/>
       
        <Route path="/demonstrators" element={<Demonstrators  text={demonstrators_text} loading={isLoadingDemonstrators}/>}/>
        
        <Route path="/innovation" element={<Innovation  text={innovation_text} loading={isLoadingInnovation}/>}/>
       

        <Route path="/contactus" element={<ContactUs />}/>
        <Route path="/people" element={<People />}/>

        <Route path="/submissions" element={<Submissions submissions={submissions} loading={isLoading}/>}/>
        <Route path="/about" element={<About about={about} loading={isLoading} />}/>
        
        <Route path="/admin" element={ <AdminPage users={users} authenticated={authenticated} 
          handleAuthenticated={handleAuthenticated} 
          handleUpdate={handleUpdate} />}  />
       
          <Route path="/delete" element ={<DeleteUser />} />
          <Route path="/register" element ={<RegisterPage />} />

        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
