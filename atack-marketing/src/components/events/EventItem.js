import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const EventItem = (props) => {
	const event = (props.event);
	//const eventToPass = withRouter(event.eventName)

	return (
		<div className="eventItem">
			<Link to={{
				pathname:'/event',
				state: {event}
				}}
				>
			<h3 className="eventTitle">{event.eventName}</h3>
			</Link>
			<p className="eventStartDateTime">{event.eventStartDateTime}</p>
			{/* links for these */}
			<div className="edit-del-links">Edit / Delete</div>
		</div>
	);
};

export default EventItem;
