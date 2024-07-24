// src/Events.js
import React, { useState } from 'react';
import EventCard from './../components/elements/event-card';
import Navbar from "./../components/navbar";
import { Link } from 'react-router-dom';

const events = [
  { title: 'Event 01', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc.', category: 'Workshop' },
  { title: 'Event 02', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc.', category: 'Company Visit' },
  { title: 'Event 03', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc.', category: 'Competitions' },
];

const Events = () => {
  const [filter, setFilter] = useState('All');

  const filteredEvents = filter === 'All'
    ? events
    : events.filter(event => event.category === filter);

  return (
    <>
      <Navbar />
      <div className="p-8 bg-primary-1 text-white min-h-screen">
        <div className='flex mx-auto'>
          <div className="flex space-x-4 mb-4 mx-auto">
            {['All', 'Workshop', 'Company Visit', 'Competitions'].map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded ${filter === category ? 'bg-yellow-500' : 'bg-teal-700'}`}
                >
                  {category}
                </button>
            ))}
          </div>
        </div>
        <div className="space-y-4 my-5">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
              category={event.category}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
