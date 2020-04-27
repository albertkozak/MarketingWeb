import React, { useState } from 'react';
import EventItem from './EventItem';

const EventList = () => {
	const [ events, setEvents ] = useState([]);

	const dummyData = [
		{
			eventId: 1,
			eventName: '7-11 Unite',
			eventStartDateTime: 'April 20th 1pm'
		},
		{
			eventId: 2,
			eventName: 'Same Same But Different',
			eventStartDateTime: 'May 5th 2pm'
		},
		{
			eventId: 3,
			eventName: 'Egg & Rice Bowl',
			eventStartDateTime: 'April 28th 12pm'
		}
	];

	// Add GET Request here

	return <div className="wrapper">{dummyData.map((event) => <EventItem key={event.eventId} event={event} />)}</div>;
};

export default EventList;
