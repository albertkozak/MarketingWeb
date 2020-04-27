import React from 'react';

const EventItem = (props) => {
	console.log(props);
	return (
		<div className="eventItem">
			<h3 className="eventTitle">{props.event.eventName}</h3>
			<p className="eventStartDateTime">{props.event.eventStartDateTime}</p>
			{/* links for these */}
			<div className="edit-del-links">Edit / Delete</div>
		</div>
	);
};

export default EventItem;
