import React from 'react';
import Navbar from "./../../components/navbar";

const EventCard = ({title, description, category}) => {
    return (
        <div>
            <Navbar />
            <div className='bg-primary-2 w-full min-h-screen'>
                <h1>Business Master Class</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc.</p>
                <button className='bg-primary-3'>Next</button>
            </div>
        </div>
    )
}

export default EventCard;