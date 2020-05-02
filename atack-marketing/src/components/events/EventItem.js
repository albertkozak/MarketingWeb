import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const EventItem = (props) => {
	const event = props.event;
	const formattedDate = new Date(event.eventStartDateTime).toISOString().slice(0, 10);

	return (
		<div className="eventItem">
			<Link
				to={{
					pathname: '/event',
					state: { event }
				}}
			>
				<h3 className="eventTitle">{event.eventName}</h3>
			</Link>
			{/* <p className="eventStartDateTime">{Date(event.eventStartDateTime)}</p> */}
			<p className="eventStartDateTime">{formattedDate}</p>
			{/* links for these */}
			<div className="edit-del-links">
				<Link
					to={{
						pathname: '/editevent',
						state: { event }
					}}
				>
					<p>Edit</p>
				</Link>
				/ Delete
			</div>
		</div>
	);
};

export default EventItem;
