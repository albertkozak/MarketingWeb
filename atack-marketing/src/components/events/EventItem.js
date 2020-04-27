import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const EventItem = (props) => {
	const history = useHistory();
	return (
		<div className="eventItem">
			<Link to='/event'>
			<h3 className="eventTitle">{props.event.eventName}</h3>
			</Link>
			<p className="eventStartDateTime">{props.event.eventStartDateTime}</p>
			{/* links for these */}
			<div className="edit-del-links">Edit / Delete</div>
		</div>
	);
};

export default EventItem;
