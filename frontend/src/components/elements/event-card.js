import React from 'react';
import Dummy from "./../../images/event1.jpg";
import { Link } from 'react-router-dom';

const EventCard = ({title, description, category}) => {
    return (
        <div className='bg-primary-5 w-1000 h-48 rounded-xl flex mx-auto'>
            <div>
                <div className='grid grid-cols-3'>
                    <div className='w-64 mx-10 my-3 rounded-xl '>
                        <img src={Dummy} alt="event" className='rounded-xl'/>
                    </div>
                    <div className='text-black space-y-3 my-5 col-span-2'>
                        <h1 className='text-2xl font-extrabold'>{title}</h1>
                        <p>{description}</p>
                        
                        <Link to="/events/detail-events">
                            <button className='bg-primary-2 px-5 rounded-lg py-2 my-4 text-white'>Read more</button>
                        </Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard;