import React from 'react';
import EventList from '../components/events/EventList';
import { useHistory } from 'react-router-dom';

const Home = () => {
	const history = useHistory();
	return (
		<div className="container">
			{/* <h1>Home Page</h1> */}
			<button className="eventButton" onClick={() => history.push('/addevent')}>
				Create Event
			</button>
			<EventList />
		</div>
	);
};

export default Home;
