import React, { useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Autoplay, Pagination, Navigation, Keyboard, Mousewheel } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function AdminSlider1() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [picture_url, setPicture_url] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [id, setId] = useState('');



    useEffect(() => {
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/people")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setUsers(json.data);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e.message)
        })
    },[]);
    
    const handleAdd = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('picture_url', picture_url);
        formData.append('name', name);

        
        try {
          const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/insertpeople", {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Server response:', response);

          if (response.ok) {
             alert('Added');
            setPicture_url('');
            setName('');

           
          } else {
            throw new Error('Fetch failed with status ' + response.status);
          }
        } catch (error) {
          console.log(error.message);
          // Display error message to user here
        }
      };

      const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('id', id);
    
        try {
          const response = await fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/deletepeople", {
            method: 'POST',
            body: formData,

            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Server response:', response);
          console.log({id});
    
          if (response.ok) {
            setId('');
            alert('Deleted');
          } else {
            throw new Error('Fetch failed with status ' + response.status);
          }
        } catch (error) {
          console.log(error.message);
          // Display error message to user here
        }
      };
      const handleAddClick = () => {
        setShowForm(true);
    };


    const handleAddCancelClick = () => {
      setShowForm(false);
  };


    return (
        <>


            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                rewind={true}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                keyboard={{
                    enabled: true,
                  }}
                mousewheel={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, Keyboard, Mousewheel]}
                className="mySwiper"
              >
                {users.map((user) => (
                    <SwiperSlide key={user.id}>
                        <div>
                            <img src={user.picture_url} alt={user.name} />
                            <p>{user.name}</p>
                            <button type="button" onClick={() => handleDelete(user.id)}>Delete</button>

                            <br/>
                            <br/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {showForm && (
    <form className='slide1' onSubmit={handleAdd}>
        <input type="text" placeholder="Picture URL" value={picture_url} onChange={(e) => setPicture_url(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleAddCancelClick}>Cancel</button>
    </form>
)}
<button onClick={handleAddClick}>Add</button>
        </>
    );
                }
