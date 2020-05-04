import React from 'react';
import { Link } from 'react-router-dom';

const EventOrganizerItem = (props) => {
	const eo = props.eo;
	console.log(eo);

	return (
		<div className="eoItem">
			<p className="eoTitle">{eo.userEmail}</p>
		</div>
	);
};

export default EventOrganizerItem;
