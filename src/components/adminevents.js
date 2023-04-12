/** 
 * 
 * @author Panagiotis Tsellos w20024460
 */
import React, { useState, useEffect, useRef } from 'react';
import ParentPage from './ParentPage';
import LoadingScreen from './loadingscreen';
import ScrollToTopButton from './ScrollToTopButton';

function Events(props) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [colors, setColors] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventtitle, setNewEventtitle] = useState("");
  const [newEventLinks, setNewEventLinks] = useState("");  
  const [newEventdescription, setNewEventdescription] = useState("");  
  const [newEventtime, setNewEventtime] = useState("");  
  const [newEventdate, setNewEventdate] = useState("");  
  const [newEventimage, setNewEventimage] = useState("");  
  const [newEventfree_text, setNewEventfree_text] = useState("");  
  const [addEventMessage, setAddEventMessage] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/events', {
        });
        const responseData = await response.json();
        if (Array.isArray(responseData.data)) {
          setData(responseData.data);
          setLoading(false);
        } else {
          console.log('Invalid data returned from API:', responseData);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;
  
    fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/delete/?id=" + id, {
            method: 'POST',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('The data cannot be fetched');
                }
                alert('The event has been deleted successfully. Please refresh the screen.');
            })
            .catch((error) => {
                console.error('Error reason:', error);
            });
    }

    //to allow one value instead of two in the db when adding an event
    

    const formRef = useRef(null);

    
    function handleAddEvent(event) {
      event.preventDefault(); // Prevent the form from submitting twice
      if (submitting) {
        return;
      }
      setSubmitting(true); // Set the flag to true to indicate that the form is being submitted
      const links = newEventLinks.trim();
      const  title = newEventtitle.trim();
      const  description = newEventdescription.trim();
      const  time = newEventtime.trim();
      const  date = newEventdate.trim();
      const  image = newEventimage.trim();
      const  free_text = newEventfree_text.trim();
    
      if (links === "") {
        alert("Please enter the event text.");
        setSubmitting(false); // Reset the flag to false
        return;
      }
    
      if ( title === "") {
        alert("Please enter the event link(s).");
        setSubmitting(false); // Reset the flag to false
        return;
      }
      if ( description === "") {
        alert("Please enter the event description.");
        setSubmitting(false); // Reset the flag to false
        return;
      }
      if ( time === "") {
        alert("Please enter the event time.");
        setSubmitting(false); // Reset the flag to false
        return;
      }
      if ( date === "") {
        alert("Please enter the event date.");
        setSubmitting(false); // Reset the flag to false
        return;
      }
      if ( image === "") {
        alert("Please enter the event image (URL).");
        setSubmitting(false); // Reset the flag to false
        return;
      }
     
      const token = localStorage.getItem('token');

      const formattedLinks = links
        .split(",")
        .map(link => {
          if (link.trim().startsWith("http://") || link.trim().startsWith("https://")) {
            return link.trim();
          } else {
            return `http://${link.trim()}`;
          }
        })
        .join(", ");
    
      fetch(`http://unn-w20017219.newnumyspace.co.uk/ic3/addevent?links=${formattedLinks}&title=${title}&description=${description}&time=${time}&date=${date}&image=${image}&free_text=${free_text}`, {
        method: 'POST',
        headers: new Headers( { "Authorization": "Bearer " + token}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('The data cannot be fetched');
          }
          setAddEventMessage('The event has been added successfully. Please refresh the screen.');
          console.log(response);
          setNewEventLinks('');
          setNewEventtitle('');
          setNewEventdescription('');
          setNewEventtime('');
          setNewEventdate('');
          setNewEventimage('');
          setNewEventfree_text('');
          setSubmitting(false); // Reset the flag to false
        })
        .catch((error) => {
          console.error('Error reason:', error);
          setSubmitting(false); // Reset the flag to false
        });
    }
    


   return (
  <ParentPage>
    {isLoading ? <LoadingScreen /> : null} {/* render the LoadingScreen component if isLoading is true */}

    <div className="Data">
      <h2> IC3 Events</h2>
      <p><strong>
        Connect with us at regional, national, international and online events.
        </strong></p>
      <p><strong>
        Upcoming regional, national, international and virtual events can be found by clicking the name of any events listed below.
        </strong></p>
      <p><strong>
        If no relevant IC3 events are advertised at the time of viewing then please fill out our contact form so we can inform you of any upcoming events that may be of interest to you.
        </strong></p>

      <p>If you have any question you can always contact us and we will get back at you!</p>

      <strong>Search a specific event here!</strong>  
      <div className="search-bar">
        <input type="text" placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
      </div>

        
      <div className="add-event">
        <button type="button" onClick={() => setIsAddingEvent(true)}>Add Event</button>
        {isAddingEvent &&
          <form ref={formRef} onSubmit={handleAddEvent}>
           <input type="text" placeholder="Add event link(s), separated by commas" value={newEventLinks} onChange={event => setNewEventLinks(event.target.value)} />

           <input type="text" placeholder="Add event title" value={newEventtitle} onChange={event => setNewEventtitle(event.target.value)} />

           <input type="text" placeholder="Add event description" value={newEventdescription} onChange={event => setNewEventdescription(event.target.value)} />

           <input type="text" placeholder="Add event time" value={newEventtime} onChange={event => setNewEventtime(event.target.value)} />

           <input type="text" placeholder="Add event date" value={newEventdate} onChange={event => setNewEventdate(event.target.value)} />

           <input type="text" placeholder="Add event image (URL)" value={newEventimage} onChange={event => setNewEventimage(event.target.value)} />
            
            <input type="text" placeholder="Add event free_text" value={newEventfree_text} onChange={event => setNewEventfree_text(event.target.value)} />

            <button type="submit" disabled={submitting}>Submit</button>

            <button type="button" onClick={() => {setIsAddingEvent(false); setAddEventMessage(null)}}>Cancel</button>
          </form>
        }
        {addEventMessage &&
          <p>{addEventMessage}</p>
        }
      </div>


      <div className="grid-container">
          {filteredData.map((item) => (
            <div className="grid-item" key={item.id}>
              <img
                src={`${item.image}`}
                alt="event"
              />
              <p>
                <strong>Title: </strong>
                {item.title}
              </p>
              <p>
                <strong>Description: </strong>
                {item.description}
              </p>
              <p>
                <strong>Time: </strong>
                {item.time}
              </p>
              <p>
                <strong>Date: </strong>
                {item.date}
              </p>
              <p>
                <strong>Free Text: </strong>
                {item.free_text}
              </p>
              <p>
                <strong>Links: </strong>
                {item.links ? (
  <button className="small_btn" onClick={() => window.open(item.links)}>
    <strong>{`Click here for more information! `}</strong>
  </button>
) : null}
</p>
            <button type="button" className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>

        ))}
      </div>



    </div>
    <ScrollToTopButton />
  </ParentPage>
);

  

}

export default Events;
