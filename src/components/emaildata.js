/**
 * This page is for the affiliation endpoint
 * it displays the authors' and papers' information from the database
 * @author: Panagiotis Tamboukaris
 */
import React, { useState, useEffect } from 'react';
 
 

function Emaildata(props) {
 
 
    const [emaildata, setEmaildata] = useState([]);
    const [visible, setVisible] = useState(false);
    
 
    const getSubmissions = () => {
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/submissions?id="+props.data.id)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setEmaildata(json.data)
                    console.log(json.data)
                }
            )
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
    }
    
    const visibleDetails = () => {
        getSubmissions();
        setVisible(!visible);
      }
   
      
    return (
        <div onClick={visibleDetails}>
            <div className='border'>
                
            <h2>{props.data.name}</h2>
            <p><strong>Organisation:</strong> {props.data.organisation}</p>
            {visible && <div>
            <p><strong>Email:</strong> {props.data.email}</p>
            <p><strong>Phone Number:</strong> {props.data.phone_number}</p>
            
            <p><strong>Job Title:</strong> {props.data.job_title}</p>
            <p><strong>Interests:</strong> {props.data.interests}</p>
            <p><strong>Preferences:</strong> {props.data.preference}</p>
            <p><strong>Message: </strong>{props.data.message}</p>
            <p><strong>Created At:</strong> {props.data.created_at}</p>
            
               
            {props.loading && <p>Loading...</p>}
            </div>}
            </div>
        </div>
    )
}
 
 
export default Emaildata;