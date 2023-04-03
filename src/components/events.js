import React, { useState, useEffect } from 'react';
import ParentPage from './ParentPage';
import LoadingScreen from './loadingscreen';
import ScrollToTopButton from './ScrollToTopButton';

function Events(props) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [colors, setColors] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://unn-w20017219.newnumyspace.co.uk/ic3/events', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      if (Array.isArray(data.data)) {
        setData(data.data);
        setLoading(false);
      } else {
        console.log('Invalid data returned from API:', data);
      }
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, []);
  

  function generateImageArray() {
    return ['https://www.shutterstock.com/image-vector/upcoming-events-isolated-on-white-600w-1538605664'];
  }
  
  useEffect(() => {
    const images = [];
    const imageArray = generateImageArray();
    for (let i = 0; i < data.length; i++) {
      images.push(imageArray[i % imageArray.length]);
    }
    setImages(images);
  }, [data]);
  
  const filteredData = data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) {
    return (
      <div className="loading-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <ParentPage>
      {isLoading ? <LoadingScreen /> : null}
      <div className="Data">
        <h2> IC3 Events</h2>
        <p>
          <strong>
            Connect with us at regional, national, international and online
            events.
          </strong>
        </p>
        <p>
          <strong>
            Upcoming regional, national, international and virtual events can be
            found by clicking the name of any events listed below.
          </strong>
        </p>
        <p>
          <strong>
            If no relevant IC3 events are advertised at the time of viewing then
            please fill out our contact form so we can inform you of any upcoming
            events that may be of interest to you.
          </strong>
        </p>
        <p>
          If you have any question you can always contact us and we will get back
          at you!
        </p>
        <strong>Search a specific event here!</strong>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
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
                {item.free_text}
              </p>
              <p>
               
                {item.links ? (
  <button className="small_btn" onClick={() => window.open(item.links)}>
    <strong>{`Click here for more information! `}</strong>
  </button>
) : null}

              </p>
              
            </div>
          ))}
        </div>
      </div>
      <ScrollToTopButton />
    </ParentPage>
  );
  
}

export default Events;