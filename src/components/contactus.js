import React, { useState, useEffect } from "react";
import ParentPage from './ParentPage';



const Result =() =>{
  return(
      <p>Your message has been successfully sent. We will contact you as soon as possible</p>
  )
}

function ContactUs() {

  const [result, showResult] = useState(false);
 

  const [state, setState] = useState({
    name: '',
    email: '',
    phone_number: '',
    interests: '',
    preference: '',
    organisation: '',
    job_title: '',
    message: '',
    emailStatus: ''
  });

  function isEmpty(value) {
    return value == null || value === '' || (Array.isArray(value) && value.length === 0);
  }


  const interestsOptions = [
    'Select Interest',
    'Arts, Culture and Heritage',
    'Construction',
    'Digital',
    'Energy and Environment',
    'Engineering and Manufacturing',
    'Professional Services',
    'Public Sector and Local Authority',
    'Science, Health and Social Care',
    'Sport and Exercise',
    'Other'
  ];
  
  const OPTIONS = [' Consultancy', ' CPD and Short Courses', ' Equipment and Facility Hire', ' Higher and Degree Apprenticeships', ' Research', ' Other'];


  // handle the value
  const handleCHange = input => e => {
    setState({...state, [input]: e.target.value});
  };

  // when submit btn is clicked
  const submitForm = (e) => {
    e.preventDefault();

    const {name, email, phone_number, interests, preference, organisation, job_title, message} = state;

    // create a new XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the response state and the step
      setState({
        ...state,
        emailStatus: xhr.responseText
      });
    });

    // open the request with the verb and the url
    xhr.open('GET', 'http://unn-w20017219.newnumyspace.co.uk/index.php?sendto=' + email + 
    '&name=' + name + 
    '&phone_number=' + phone_number +
    '&interests=' + interests +
    '&preference=' + preference +
    '&organisation=' + organisation +
    '&job_title=' + job_title +
    '&message=' + message);

    // send the request
    xhr.send();
    e.target.reset();
    showResult(true);
    // reset the fields
    setState({
      name: '',
      email: '',
      phone_number: '',
      interests: '',
      preference: '',
      organisation: '',
      job_title: '',
      message: '',
      emailStatus: ''
    });
  };

  const {name, email, phone_number, interests, preference, organisation, job_title, message, emailStatus} = state;
  if (!isEmpty(emailStatus)) {
    console.log(emailStatus);
  }
  
   
  
    
   
    return (
    <ParentPage>
      <div className="contactme" id="contact">
        <div className="contactOverlay">
          <div className="container">
            <div className="contactform">
              <form onSubmit={submitForm}>
              
                <div className="formWord">
                  <h2>Contact Us</h2>
                  <span>Full Name</span>
                  <br />
                  <input className="input100" type="text" name="fullName" value={name} onChange={handleCHange('name')} placeholder="Name" required  />
                  <br />
                  <span>Phone Number</span>
                  <br />
                  <input className="input100"  type="text"  name="phone"  value={phone_number}   onChange={handleCHange('phone_number')}   placeholder="Phone Number"  onKeyPress={(event) => {const regex = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/; const key = event.key;if (!regex.test(key)) {event.preventDefault();}}} required />
                  
               <br />
               <span>Interests</span>
               <br />
               <select className="input100" name="interests" value={state.interests} onChange={handleCHange('interests')} required>
               {interestsOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
                   ))}
  </select>
               <br />
                  <span>Email</span>
                  <br />
                  <input className="input100" type="email" name="email" value={email} onChange={handleCHange('email')} placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                  <br />
                  </div>
                   <div className="formWord">
                  
                  <span>Organisation</span>
                  <input className="input100" type="text" name="organisation" value={organisation} onChange={handleCHange('organisation')} placeholder="Organisation" required />
                  <br />
                  <span>Job Title</span>
                  <input className="input100" type="text" name="jobtitle" value={job_title} onChange={handleCHange('job_title')} placeholder="Job Title" required />
                  <br />
                
               <span>Message</span>
                  <br />
                  <textarea  value={message} onChange={handleCHange('message')} placeholder="Message"></textarea>
                  <br />

                  <span>Preferences</span>
                  <br />
                  <div className="pref">
                                      {OPTIONS.map((option, index) => (
                      <div  key={index}>
                       
                       
                        {option}

                          <input
                          className="checkbox"
                            type="checkbox"
                            value={option}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setState((prevState) => ({
                                  ...prevState,
                                  preference: [...prevState.preference, option],
                                }));
                              } else {
                                setState((prevState) => ({
                                  ...prevState,
                                  preference: prevState.preference.filter((item) => item !== option),
                                }));
                              }
                            }}
                            checked={state.preference.includes(option)}
                           

                          />
                        
                      </div>
                    ))}
                    </div>
                  <br />
                  <button type="submit">SUBMIT</button>                  <button  onClick={() => {window.location.href = '/tppfront/submissions';}}> <strong>Email Submissions</strong></button>
 
                  <div className="row">{result ? <Result /> : null} </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ParentPage>
  );
}

export default ContactUs;
