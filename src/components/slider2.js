import React, { useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Autoplay, Pagination, Navigation, Keyboard, Mousewheel } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Slider2() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [picture_url, setPicture_url] = useState('');
    const [showForm, setShowForm] = useState(false);
        const [id, setId] = useState('');

    useEffect(() => {
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/partners")
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
  
    return (
        <>
        <Swiper
        spaceBetween={40}
        slidesPerView={5}
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

                        <br/>
                        <br/>

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
      
        </>
    );
}
