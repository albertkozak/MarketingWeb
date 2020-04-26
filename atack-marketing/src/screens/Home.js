import React from 'react';
import EventList from '../components/events/EventList'

const Home = () => {
	return (
		<div className="container">
			{/* <h1>Home Page</h1> */}
			<button
				className="eventButton"
			>Create Event
			</button> 
			<EventList />
		</div>
	);
};

export default Home;
